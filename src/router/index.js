import { createRouter,createWebHistory } from "vue-router";
import HomeComponent from '@/components/HomeComponent.vue'
import MemberList from '@/views/MemberList.vue'
import LoginComponent from '@/views/LoginComponent.vue'

const routes = [
    {
        // url 경로 지정
        path: '/',
        // router의 이름 지정
        name: 'HOME',
        component: HomeComponent,
    },
    {
        path: '/members',
        name: 'MemberList',
        component: MemberList,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
    },
];



const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    // 1. createWebHistory 2. createHashHistory
    history: createWebHistory(),
    routes

});

export default router;