<template>
    <ItemListComponent
    :isAdmin="false"
    pageTitle="상품목록"></ItemListComponent>
</template>

<script>
import ItemListComponent from '@/components/ItemListComponent.vue';
export default {
    components:{
    ItemListComponent,
}
}
</script>
