import { createRouter,createWebHistory } from "vue-router";
import HomeComponent from '@/components/HomeComponent.vue';
import LoginComponent from '@/views/LoginComponent.vue';
//export default인 경우에는 {} 필요없고, 여러개 요소가 있을경우에는 {}필요
import {memberRoutes} from './memberRouter.js'
import {orderRoutes} from './orderRouter.js'


const routes = [
    {
        // url 경로 지정
        path: '/',
        // router의 이름 지정
        name: 'HOME',
        component: HomeComponent,
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
    },
    ...memberRoutes,
    ...orderRoutes
    // ...은 스프레드 연산자로 불리고, 주로 배열요소를 다른 배열요소에 합할때 사용
];



const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    // 1. createWebHistory 2. createHashHistory
    history: createWebHistory(),
    routes

});

export default router;