<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top: 20px;">장바구니 목록</h1>
        </div>
        <button class="btn btn-secondary" @click="clearCart">장바구니 비우기</button>
        <button class="btn btn-success" @click="placeOrder">주문하기</button>
        <table class="table">
            <thead>
                <tr>
                    <th>제품 id</th>
                    <th>제품명</th>
                    <th>제품 수량</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getcartItems" :key="item.itemId">
                    <td>{{item.itemId}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.count}}</td>
                </tr>
            </tbody>
            <div>
              
            </div>
        </table>  
    </div>
</template>
<script>
import axios from 'axios';
import {mapGetters,mapActions} from 'vuex';
export default {
    computed:{
      ...mapGetters(['getcartItems','gettotalQuantity'])
    },
    methods:{
        ...mapActions(['clearCart']),
        clearCart(){
            // this.$store.commit(`clearCart`);
            this.$store.dispatch(`clearCart`);
        },
        async placeOrder(){
            // Object.keys : 위의 데이터 구조에서 1,2 와 같은 key값 추출하는 메소드
            const orderItems = this.getcartItems.map(item =>
            {
                return {itemId:item.itemId, count: item.count}
            }
            )
            if(!confirm(`${this.gettotalQuantity}개의 상품을 주문하시겠습니까?`)){
                alert("주문이 취소되었습니다.");
                return;
            }
            if(this.gettotalQuantity <1){
                alert("장바구니에 물건이 없습니다");
                return;
            }
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`,orderItems,{headers});
                console.log(orderItems);
                alert("주문완료")
                this.$store.commit('clearCart');
                }               
            catch(error){
                console.log(error);
                alert("주문실패")
            }
            
        },

    }
}
</script>