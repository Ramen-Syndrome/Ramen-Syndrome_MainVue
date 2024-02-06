<script setup>
import salesdaily from './components/SalesDaily.vue';
import saleshistory from './components/SalesHistory.vue';
import salesoffice from './components/SalesOffice.vue';
import salesproduct from './components/SalesProduct.vue';
</script>

<template>
  <div>
    <!-- 헤더 추가 -->
    <header class="header">
      <h1>영업 관리 시스템</h1>
    </header>
    <saleshistory/>
    <salesdaily/>
    <salesoffice/>
    <salesproduct/>
  </div>
</template>

<style>
.header {
  background: linear-gradient(to right, #30CFD0, #330867); /* 그라데이션 배경색 */
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

h1 {
  color: #ffffff; /* 제목 글자색 */
  font-family: "Roboto", sans-serif; /* 글꼴 */
  font-weight: 700; /* 굵게 */
  font-size: 48px; /* 크기 */
  margin: 0;
  padding: 0;
  position: relative;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); /* 텍스트 그림자 */
}

/* 추가 스타일 */
h1:before {
  content: "";
  display: block;
  width: 50px;
  height: 3px;
  background-color: #ffffff;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

h1:after {
  content: "";
  display: block;
  width: 100px;
  height: 1px;
  background-color: #ffffff;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

