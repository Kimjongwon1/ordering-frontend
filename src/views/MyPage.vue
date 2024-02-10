<template>
    <div class="container">
        <div class="page-header">
            <h1 class="display-4" style="margin-top: 20px;">회원 정보</h1>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>도시</th>
                    <th>상세주소</th>
                    <th>우편번호</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ memberInfo.name }}</td>
                    <td>{{ memberInfo.email }}</td>
                    <td>{{ memberInfo.city }}</td>
                    <td>{{ memberInfo.street }}</td>
                    <td>{{ memberInfo.zipcode }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <OrderListComponent :isadmin="false" :apiUrl="`/member/myorders`">
    </OrderListComponent>
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';
import axios from 'axios';
export default {
    props:['id'],
    components:{
        OrderListComponent
    },
    data(){
        return{
            memberInfo: {}, // 빈 객체로 초기화
        }
    },
    created(){
       this.fetchMember();
    },
    methods:{
       async fetchMember(){
        try{
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization : `Bearer ${token}` } : {};
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myInfo`, { headers }); // URL을 회원 정보를 가져오는 엔드포인트로 변경
            this.memberInfo = response.data;
        }catch(error){
            console.error("회원 정보를 불러오는데 실패했습니다.", error);
            // 사용자에게 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
        }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
