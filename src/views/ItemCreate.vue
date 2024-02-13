<template>
    <div class="container mx-auto mt-4 px-4">
        <h1 class="text-center text-3xl font-bold my-4">상품등록</h1>
            <form @submit.prevent="ItemCreate">
                <div class="form-group">
                   <label>상품명</label>  <input type="text" v-model="name" class="form-control p-2 border rounded">
                </div>
                <div class="form-group">
                   <label>카테고리</label>  <input type="text" v-model="name" class="form-control p-2 border rounded">
                </div>
                <div class="form-group">
                   <label>가격</label> <input type="number" v-model="price" class="form-control p-2 border rounded">
                </div>
                <div class="form-group">
                    <label>재고수량</label> <input type="number" v-model="stockQuantity" class="form-control p-2 border rounded">
                </div>
                <div class="form-group">
                    <!-- @change와 @click 비교
                    : @click은 요소가 클릭될때마다 함수실행
                    @change는 해당 태그의 값이 변할때 함수실행 -->
                    <label>상품이미지</label> <input type="file"  class="form-control" accept="image/*" @change="fileUpload">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary">등록</button>
                </div>
               
            </form>
      
    </div>
    
    </template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            name: "",
            category:"",
            price: null,
            stockQuantity:null,
            itemImage:null,

        }
    },
    methods:{
        fileUpload(event){
            // event.target = 이벤트가 발생한 DOM요소를 가리키는 객체
            this.itemImage = event.target.files[0];
        },
        async ItemCreate(){
            const registerData = new FormData();
            registerData.append("name", this.name)
            registerData.append("category", this.category)
            registerData.append("price", this.price)
            registerData.append("stockQuantity", this.stockQuantity)
            registerData.append("itemImage", this.itemImage)
            const token = localStorage.getItem("token");
            const headers = {
                Authorization : token ?  `Bearer ${token}`: {}}
        
            await axios.post(`${process.env.VUE_APP_API_BASE_URL}/item/create`, registerData,{headers});
            this.$router.push("/items/manage")
        },
    }
}
</script>
