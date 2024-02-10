<template>
<div class="container mx-auto mt-4 px-4">
    <h1 class="text-center text-3xl font-bold my-4">회원가입</h1>
    <div class="max-w-md mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-lg">
        <form @submit.prevent="memberCreate">
            <div class="mb-4">
                Name <input type="text" v-model="name" class="form-control p-2 border rounded">
            </div>
            <div class="mb-4">
                Email <input type="email" v-model="email" class="form-control p-2 border rounded">
            </div>
            <div class="mb-4">
                Password <input type="password" v-model="password" class="form-control p-2 border rounded">
            </div>
            <div class="mb-4">
                도시 <input type="text" v-model="city" class="form-control p-2 border rounded">
            </div>
            <div class="mb-4">
                상세주소 <input type="text" v-model="street" class="form-control p-2 border rounded">
            </div>
            <div class="mb-4">
                우편번호 <input type="text" v-model="zipcode" class="form-control p-2 border rounded">
            </div>
            <button type="submit" class="w-full btn btn-dark text-white font-bold py-2 px-4 rounded">등록</button>
        </form>
    </div>
</div>

</template>
<script>
import axios from 'axios'

export default {
    data(){
        return{
            name: "",
            email: "",
            password: "",
            city: "",
            street: "",
            zipcode: "",
        }
    },
    methods:{
        async memberCreate(){
                try{
                const registerData = {
                    name: this.name, 
                    email: this.email,
                    password: this.password,
                    city: this.city,
                    street: this.street,
                    zipcode: this.zipcode,
                };
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData);
                // window.location.href = "/login";
                this.$router.push({name : 'Login'})
            }catch(error){
                const error_message = error.response.data.error_message;
                if(error_message){
                    console.log(error_message);
                    alert(error_message);
                }else{
                    console.log(error);
                    alert("가입실패");
                }
                
            }
            
        }
    }

}
</script>