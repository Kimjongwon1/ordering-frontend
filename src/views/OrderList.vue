<template>
    <OrderListComponent
    :isadmin="true"
    apiUrl="/order/orders"></OrderListComponent>
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';
export default {
    components:{
        OrderListComponent
    }
}
</script>
