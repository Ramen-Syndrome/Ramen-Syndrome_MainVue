<script setup>
import { ref, onMounted, computed } from 'vue';

const jsonData = ref([]);

// 데이터를 json 서버에서 가져오는 비동기 함수
async function fetchSalesData() {
    const res = await fetch(`http://localhost:3000/sales`);
    jsonData.value = await res.json();
}

// 컴포넌트가 마운트될 때 데이터를 가져온다.
onMounted(fetchSalesData);

// 지점별 2024년 2월 4일과 2024년 2월 5일 매출 합계를 계산하는 계산된 속성
const salesSumArray = computed(() => {
    return calculateSalesSumByDate(jsonData.value, '02/04/2024', '02/05/2024');
});

// 지점별 2024년 2월 4일과 2024년 2월 5일 매출 합계를 계산하는 함수
function calculateSalesSumByDate(salesData, date1, date2) {
    const salesSum = {};
    salesData.forEach(({ 지점명, 판매가, 거래날짜 }) => {
        if (!salesSum[지점명]) {
            salesSum[지점명] = { '2024-02-04 매출액': 0, '2024-02-05 매출액': 0 };
        }
        if (거래날짜 === date1) {
            salesSum[지점명]['2024-02-04 매출액'] += 판매가;
        } else if (거래날짜 === date2) {
            salesSum[지점명]['2024-02-05 매출액'] += 판매가;
        }
    });
    return Object.keys(salesSum).map(지점명 => ({
        지점명,
        ...salesSum[지점명]
    }));
}
</script>

<template>
  <div>
    <h1 class="center-align">지점별 2024년 2월 4일~ 5일 매출 실적</h1>
    <h5 class="right-align"> 단위: 원 </h5>
    <table class="sales-table">
      <thead>
        <tr>
          <th class="center-align">지점명</th>
          <th class="center-align">2024-02-04 매출액</th>
          <th class="center-align">2024-02-05 매출액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salesdata in salesSumArray" :key="salesdata.지점명">
          <td class="center-align">{{ salesdata.지점명 }}</td>
          <td class="right-align">{{ salesdata['2024-02-04 매출액'].toLocaleString() }}</td>
          <td class="right-align">{{ salesdata['2024-02-05 매출액'].toLocaleString() }}</td>
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

/* 테이블 헤더와 데이터 셀에 대한 중앙 정렬 */
table th.center-align, table td.center-align {
    text-align: center;
}

/* 테이블 헤더와 데이터 셀에 대한 우측 정렬 */
table th.right-align, table td.right-align {
    text-align: right;
}
</style>
