<script setup>
import { ref, onMounted, computed } from 'vue';

const jsonData = ref([]);

async function fetchSalesData() {
    const res = await fetch(`http://localhost:3000/sales`);
    jsonData.value = await res.json();
}

onMounted(fetchSalesData);

// jsonData를 기반으로 지점별 판매 합계를 계산하는 computed 속성
const salesSumArray = computed(() => {
    if (!jsonData.value || jsonData.value.length === 0) return [];
    return calculateSalesSumByStore(jsonData.value);
});

function calculateSalesSumByStore(salesData) {
    const salesSumByStore = {};
    salesData.forEach(sale => {
        const store = sale.지점명;
        const salesAmount = sale.판매가;
        if (!salesSumByStore[store]) {
            salesSumByStore[store] = 0;
        }
        salesSumByStore[store] += salesAmount;
    });
    return Object.keys(salesSumByStore).map(store => ({
        지점명: store,
        판매가합계: salesSumByStore[store]
    }));
}
</script>


<template>
  <div>
	<h1> 지점별 전월 매출 실적</h1>
    <table class = "sales-table">
      <thead>
        <tr>
          <th>지점명</th>
          <th>전월 매출액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salesdata in salesSumArray" :key="salesdata.지점명">
          <td>{{ salesdata.지점명 }}</td>
          <td>{{ (salesdata.판매가합계).toLocaleString() }}원</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style>
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
</style>
