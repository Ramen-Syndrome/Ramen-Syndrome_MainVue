<script setup>
import { ref, onMounted, computed } from 'vue';

const jsonData = ref([]);

async function fetchSalesData() {
    const res = await fetch(`http://localhost:3000/sales`);
    jsonData.value = await res.json();
}

onMounted(fetchSalesData);

const dailySalesArray = computed(() => {
    if (!jsonData.value || jsonData.value.length === 0) return [];
    return jsonData.value;
});
</script>

<template>
  <div>
    <h1>지점별 일일 매출 실적</h1>
    <table class="sales-table">
      <thead>
        <tr>
          <th>지점명</th>
          <th>거래날짜</th>
          <th>상품명</th>
          <th>판매가</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in dailySalesArray" :key="sale.id">
          <td>{{ sale.지점명 }}</td>
          <td>{{ sale.거래날짜 }}</td>
          <td>{{ sale.상품명 }}</td>
          <td>{{ (sale.판매가).toLocaleString() }}원</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

