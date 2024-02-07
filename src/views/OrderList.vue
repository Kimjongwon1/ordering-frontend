<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top: 20px;">주문 목록</h1>
        </div>
        <table class="table">
            <thead>
                <th>#</th>
                <th>회원EMAIL</th>
                <th>주문상태</th>
                <th>ACTION</th>
            </thead>
        <tbody>
            <template  v-for="order in orderList" :key="order.id">
            <tr @click="toggleOrder(order.id)" style="cursor: pointer;">
                <td>{{order.id}}</td>
                <td>{{order.memberEmail}}</td>
                <td>{{order.orderStatus}}</td>
                <td><button> 취소 </button></td>
            </tr>
            <tr v-if="visibleOrder.has(order.id)">
                <td colspan="4">
                    <ul>
                        <li v-for="orderItem in order.orderItems" :key="orderItem.id">
                            {{ orderItem.itemName }} - {{ orderItem.count }}개
                        </li>
                    </ul>
                </td>
            </tr>           
        </template>
        </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            orderList: [],
            visibleOrder: new Set(),
        }
    },
    async created(){
        try{
            const token = localStorage.getItem("token");
            const headers = token ? {Authorization : `Bearer ${token}`} : {};
            const response = await axios.get("http://localhost:8081/order/orders",{headers});
            this.orderList = response.data;
        }catch(error){
            console.log(error)
        }
    },
    methods: {
        toggleOrder(orderId){
        if(this.visibleOrder.has(orderId)){
            this.visibleOrder.delete(orderId)
        }else{
            this.visibleOrder.add(orderId)
        }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>