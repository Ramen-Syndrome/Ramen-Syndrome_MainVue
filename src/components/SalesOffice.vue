<script setup>
import { ref, onMounted, computed } from 'vue';

const jsonData = ref([]);

async function fetchSalesData(){
const res = await fetch(`http://localhost:3001/sales`);
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
	const dates = sale.거래날짜;
        if (!salesSumByStore[store] && dates === '2024-02-05') {
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
    <h1>지점별 매출 현황(2024-02-05)</h1>
    
    <table>
        <tr>
	    <th>지점명</th>
            <th>판매가 합계</th>
        </tr>
        <tr v-for = "salesdata in salesSumArray" :key="salesdata.지점명">
            <td>{{ salesdata.지점명 }}</td>
            <td>{{ (salesdata.판매가합계).toLocaleString() }}원</td>
        </tr>
    </table>
</div>
</template>

<style>
td, th {
    padding: 10px;
    border: 1px solid #ccc;
}
body {
    padding: 1rem;
}
</style>
