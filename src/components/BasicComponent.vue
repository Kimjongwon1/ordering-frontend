<template>
    <h1>Hello world {{myLang}}</h1>
    <input type="text" value="myvalue">
    <!-- :value는 v-bind-value= 의 축약어이다. -->
    <!-- v-bind는 input박스에서 많이 사용하는 단방향 데이터 바인딩 방식이다. -->
    <input type="text" :value="inputvalue1">
    <!-- v-model은 양방향 데이터 바인딩 모델이라는 차이점 -->
    <input type="text" v-model="inputvalue2">
    <!-- @click == onclick -->
    <button @click="showValue">변수 변경사항 확인</button>

</template>

<script>
export default {
    data(){
        return{
            myLang: "python",
            inputvalue1: "python2",
            inputvalue2: "python3",

        }
    },
    // vue 생명주기에서 인스턴스가 생성되는 시점을 created라고 하고, 화면이 열리기전에 실행되는 함수
    created() {
        this.myLang="java";
    },
    methods: {
        showValue(){
            alert(this.inputvalue2);
        }
    }
}
</script>
