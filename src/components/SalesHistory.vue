<script setup>
import { ref, onMounted, computed } from 'vue';

const jsonData = ref([]);

// 데이터를 json 서버에서 가져오는 비동기 함수
async function fetchSalesData() {
    const res = await fetch(`http://localhost:3000/sales`);
    jsonData.value = await res.json();
}

//컴포넌트가 마운트 될 때 데이터를 가져온다.
onMounted(fetchSalesData);

// 지점별 전월(1월)과 당월(2월) 매출 합계를 계산
const salesSumArray = computed(() => {
    return calculateSalesSumByMonth(jsonData.value, '01/2024', '02/2024');
});


// 지점별 전월과 당월 매출 합계를 계산하는 함수
function calculateSalesSumByMonth(salesData, prevMonth, currMonth) {
    const salesSum = {};
    salesData.forEach(({ 지점명, 판매가, 거래날짜 }) => {
      
        // 'MM/DD/YYYY'에서 'MM/YYYY' 형태로 변환
        const monthYear = 거래날짜.slice(0, 2) + '/' + 거래날짜.slice(6, 10);

        if (!salesSum[지점명]) {
            salesSum[지점명] = { 전월매출누계: 0, 당월매출누계: 0 };
        }
        if (monthYear === prevMonth) {
            salesSum[지점명].전월매출누계 += 판매가;
        } else if (monthYear === currMonth) {
            salesSum[지점명].당월매출누계 += 판매가;
        }
    });
    return Object.keys(salesSum).map(지점명 => ({
        지점명,
        ...salesSum[지점명]
    }))//.sort((a, b) => b.당월매출누계 - a.당월매출누계); // 당월 매출액으로 내림차순 정렬
}

</script>


<template>
  <div>
	<h1 class="center-align"> 지점별 전월/당월 매출 집계</h1>
  <h5 class="right-align"> 단위: 원 </h5> 
    <table class = "sales-table">
      <thead>
        <tr>
          <th class="center-align">지점명</th>
          <th class="center-align">전월 매출</th>
          <th class="center-align">당월 매출</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salesdata in salesSumArray" :key="salesdata.지점명">
          <td class="center-align">{{ salesdata.지점명 }}</td>
          <td class="right-align">{{ (salesdata.전월매출누계).toLocaleString() }}</td>
          <td class="right-align">{{ (salesdata.당월매출누계).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style>

h1.center-align{
  text-align: center; /* 중앙 정렬 */ 
}

h5.right-align {
    text-align: right; /* 우측 정렬 */
}

.sales-table {
  width: 100%;
  border-collapse: collapse; /* 테두리 겹침을 방지 */
}

.sales-table, .sales-table th, .sales-table td {
  border: 1px solid black; /* 테두리 설정 */
}

.sales-table th, .sales-table td {
  padding: 8px; /* 셀 내부 여백 */
  text-align: left; /* 텍스트 정렬 */
}

.sales-table thead {
  /*background-color: #f2f2f2; /* 헤더 배경색 */
}

.sales-table .center-align { /* 테이블 */
        text-align: center; /* 중앙 정렬 클래스 */
}

.sales-table .right-align { /* 테이블 */
        text-align: right; /* 우측 정렬 클래스 */
}

</style>
