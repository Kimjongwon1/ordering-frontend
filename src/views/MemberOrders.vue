<template>
    <OrderListComponent
    :isadmin="true"
    :apiUrl="`/member/${id}/orders`">
</OrderListComponent>
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';
export default {
    //매개변수로 데이터 넘겨받을때 props 사용
    props:['id'],
    components:{
        OrderListComponent
    }
   
}
</script>

<style lang="scss" scoped>

</style>