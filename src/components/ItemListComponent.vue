<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top: 20px; text-align: center;">{{pageTitle}}</h1>
        </div>
        <div class="d-flex justify-content-between" style="margin-top: 20px;">
            <form @submit.prevent=" searchItems">
                <select v-model="searchType" style="display-inline-block; width:auto; margin-right:5px">
                    <option value="optional" >선택</option>
                    <option value="name">상품명</option>
                    <option value="category">카테고리</option>
                </select>
                <input v-model="searchValue" type="text"/>
                <button type="submit">검색</button>
            </form>
            <div v-if="!isAdmin">
                <button @click="addCart" class="btn btn-secondary">장바구니</button>
                <button @click="placeOrder" class="btn btn-success">주문하기</button>
            </div>
            <div v-if="isAdmin">
                <a href="/item/create"><button class="btn btn-success">상품등록</button></a>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th v-if="!isAdmin"></th>
                    <th>제품사진</th>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>재고수량</th>
                    <th v-if="!isAdmin">주문수량</th>
                    <th v-if="isAdmin">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in itemList" :key="item.id">
                    <td v-if="!isAdmin"><input type="checkbox" v-model="selectedItems[item.id]"></td>
                    <td><img :src="getImage(item.id)" style="height : 100px; width:auto;"/></td>
                    <td>{{item.name}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.stockQuantity}}</td>
                    <td v-if="!isAdmin"><input type="number" min="1" v-model="item.quantity" style="width: 60px;"></td>
                    <td v-if="isAdmin"><button @click.stop="deleteItem(item.id)" class="btn btn-secondary">삭제</button></td>
                </tr>
            </tbody>
            </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['isAdmin','pageTitle'],
    data(){
        return{
            itemList: [],
            pageSize: 10,
            currentPage : 0,
            searchType: 'name',
            searchValue: '',
            isLastPage: false,
            isLoading: false,
            selectedItems:{}
        }
    },
     created(){
        this.loadItems();
    },
    // window dom 객체가 생성된 이후에 생성되는 hook함수
    mounted(){
        //scroll이 동작할때마다 scrollPageination함수 호출
        window.addEventListener('scroll',this.scrollPagenation);

        // <!-- 양방향바인딩 -->
                    // <!-- 스크롤 없애지마라 페이지 수를 넉넉히 -->
    },
    methods: {
        addCart(){
            const orderItems = Object.keys(this.selectedItems)
                                .filter(key=>this.selectedItems[key] === true)
                                .map(key => {
                                const item = this.itemList.find(item=> item.id == key)
                                return {itemId:item.id, name:item.name,count:item.quantity};
            });
            orderItems.forEach(item => this.$store.commit('addToCart',item));
           
        },
       async placeOrder(){
            // Object.keys : 위의 데이터 구조에서 1,2 와 같은 key값 추출하는 메소드
            const orderItems = Object.keys(this.selectedItems)
                                .filter(key=>this.selectedItems[key] === true)
                                .map(key => {
                                const item = this.itemList.find(item=> item.id == key)
                                return {itemId:item.id, count:item.quantity};
            })
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderItems,{headers});
                console.log(orderItems);
                alert("주문완료")
                window.location.reload();}               
            catch(error){
                console.log(error);
                alert("주문실패")
            }
            
        },
        searchItems(){
            this.itemList = [],
            this.currentPage = 0,
            this.isLastPage = false,
            this.loadItems();
        },
        scrollPagenation(){
            // innerHeight = 브라우저 창(뷰포트)의 내부높이를 픽셀단위로 변환
            // offsetHeight = 전체브라우저 창의 높이
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if(nearBottom && !this.isLastPage && !this.isLoading ){
                this.currentPage++;
                this.loadItems();
            }
        },
        getImage(id){
            return `${process.env.VUE_APP_API_BASE_URL}/item/${id}/image`
        },
       async loadItems(){
            try{
                this.isLoading = true;
            const params ={
                page : this.currentPage,
                size : this.pageSize,
                // [this.searchType] :this.searchValue
            }
            if(this.searchType === "name"){
                params.name = this.searchValue;
            }else if(this.searchType === "category" ){
                params.category = this.searchValue;
            }
            console.log("data 호출");
            // const token = localStorage.getItem("token");
            // const headers = token ? {Authorization : `Bearer ${token}`} : {};
            // param(default, 작동을 안함) 과 params(받고싶은갯수만큼)는 차이가 있다.
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/item/items` ,{params});
            const addItemList = response.data.map(item=>({...item, quantity:1}));
            if(addItemList.length < this.pageSize){
                this.isLastPage = true;
            }
            this.itemList = [...this.itemList, ...addItemList]; 
        }catch(error){
            console.log(error)
        }
        this.isLoading = false;
        },
        async deleteItem(itemId){
             if(confirm("정말 삭제 하시겠습니까?")){
                try{
                    const token = localStorage.getItem("token");
                    const headers = token ? {Authorization : `Bearer ${token}`} : {};
                    await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/item/${itemId}/delete`,{headers});
                    // const item = this.itemList.find(item => item.id == itemId);
                    // item.delYn = "Y";
                    window.location.reload();
                }catch(error){
                    console.log.error;
                    alert("아이템 삭제 실패")
                }
                
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>