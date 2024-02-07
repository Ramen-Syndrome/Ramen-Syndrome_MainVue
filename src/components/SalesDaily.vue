<script setup>
import { ref, onMounted } from 'vue';

async function jsons() {
    const response = await fetch("https://ramen-syndrome-jsonserver.fly.dev/sales");
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

        const existingProduct = groupedByBranch[key].상품들.find(product => product.상품명 === sale.상품명);

        if (existingProduct) {
            existingProduct.총매출 += sale.판매가;
            existingProduct.판매갯수++;
        } else {
            groupedByBranch[key].상품들.push({
                상품명: sale.상품명,
                판매가: sale.판매가,
                총매출: sale.판매가,
                판매갯수: 1
            });
        }
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
            상품별정보: group.상품들,
            평균판매가: totalSales.총매출 / totalSales.판매갯수,
            총매출: totalSales.총매출,
            판매갯수: totalSales.판매갯수
        };
    });

    jsonData.value = uniqueData;
    filteredData.value = uniqueData;
});

function formatCurrency(value) {
    return value.toLocaleString();
}
</script>

<template>
  <div>
    <h1 class="center-align">일일 매출 실적</h1>
    <h5 class="right-align"> 단위: 원 </h5>
    <table class="sales-table">
      <thead>
        <tr>
          <th class="center-align">지점명</th>
          <th class="center-align">거래날짜</th>
          <th class="center-align">상품명</th>
          <th class="center-align">판매가</th>
          <th class="center-align">총 매출액</th>
          <th class="center-align">팔린 갯수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in filteredData" :key="sale.id">
          <td class="center-align">{{ sale.지점명 }}</td>
          <td class="center-align">{{ new Date(sale.거래날짜).toLocaleDateString() }}</td>
          <td class="left-align">
            <div v-for="(productInfo, index) in sale.상품별정보" :key="index">
                {{ productInfo.상품명 }}
              <hr v-if="index !== sale.상품별정보.length - 1" /> 
            </div>
          </td>
          <td class="right-align">
            <div v-for="(productInfo, index) in sale.상품별정보" :key="index">
              {{ formatCurrency(productInfo.판매가) }}
            <hr v-if="index !== sale.상품별정보.length -1" />
            </div>
           </td>
          <td class="right-align">{{ formatCurrency(sale.총매출) }}</td>
          <td class="right-align">{{ sale.판매갯수 }}</td>
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
  padding: 10px; /* 셀 내부 여백 */
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