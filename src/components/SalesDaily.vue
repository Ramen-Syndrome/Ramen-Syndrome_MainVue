<script setup>
import { ref, onMounted } from 'vue';

async function jsons() {
    const response = await fetch("http://localhost:3000/sales");
    const jsonData = await response.json();
    return jsonData;
}

const jsonData = ref([]);
let filteredData = ref([]);
let searchTerm = ref('');

onMounted(async () => {
    const data = await jsons();
    const selectedDate = "01/05/2024";

    // 선택한 날짜의 데이터만 필터링합니다.
    const filteredSales = data.filter(item => item.거래날짜 === selectedDate);

    // 중복된 지점을 제거하면서 판매가와 총 매출, 판매 갯수를 계산합니다.
    const groupedByBranch = {};

    filteredSales.forEach(sale => {
        const key = `${sale.지점명}-${sale.거래날짜}`;

        if (!groupedByBranch[key]) {
            groupedByBranch[key] = { 지점명: sale.지점명, 거래날짜: sale.거래날짜, 상품들: [] };
        }

        groupedByBranch[key].상품들.push({
            상품명: sale.상품명,
            판매가: sale.판매가,
            원가: sale.원가,
            판매갯수: 1,
            총매출: sale.판매가
        });
    });

    // 중복 제거된 데이터를 배열에 추가합니다.
    const uniqueData = Object.values(groupedByBranch).map(group => {
        const totalSales = group.상품들.reduce((acc, product) => {
            acc.총매출 += product.총매출;
            acc.판매갯수 += product.판매갯수;
            return acc;
        }, { 총매출: 0, 판매갯수: 0 });

        return {
            지점명: group.지점명,
            거래날짜: group.거래날짜,
            상품명: group.상품들.map(product => product.상품명).join(', '),
            평균판매가: totalSales.총매출 / totalSales.판매갯수,
            총매출: totalSales.총매출,
            판매갯수: totalSales.판매갯수
        };
    });

    jsonData.value = uniqueData;
    filteredData.value = uniqueData;
});

function formatCurrency(value) {
    return value.toLocaleString() + '원';
}
</script>

<template>
  <div>
    <h1>일일 매출 실적</h1>
    <table class="sales-table">
      <thead>
        <tr>
          <th>지점명</th>
          <th>거래날짜</th>
          <th>상품명</th>
          <th>평균 판매가</th>
          <th>총 매출액</th>
          <th>팔린 갯수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in filteredData" :key="sale.id">
          <td>{{ sale.지점명 }}</td>
          <td>{{ sale.거래날짜 }}</td>
          <td>{{ sale.상품명 }}</td>
          <td>{{ formatCurrency(sale.평균판매가) }}</td>
          <td>{{ formatCurrency(sale.총매출) }}</td>
          <td>{{ sale.판매갯수 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
