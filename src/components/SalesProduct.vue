<script setup>
import { ref } from 'vue';

async function jsons() {
    const response = await fetch("http://localhost:3000/sales");
    const jsonData = await response.json();
    return jsonData;
}

const jsonData = ref([]);

// 데이터를 가져와 jsonData 변수에 할당합니다.
jsons().then(data => {
    // 중복된 상품명을 제거하고 총 매출을 계산합니다.
    const uniqueProducts = data.reduce((acc, cur) => {
        const existingProduct = acc.find(item => item.상품명 === cur.상품명);
        if (existingProduct) {
            existingProduct.판매가 += cur.판매가;
            existingProduct.원가 += cur.원가;
        } else {
            acc.push({ ...cur });
        }
        return acc;
    }, []);
    jsonData.value = uniqueProducts;
});
</script>

<template>
  <div>
    <h1>상품별 매출 내역</h1>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>상품명</th>
            <th>원가</th>
            <th>판매가</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in jsonData" :key="product.상품명">
            <td>{{ product.상품명 }}</td>
            <td>{{ product.원가 }}</td>
            <td>{{ product.판매가 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<style>
  body {
    padding: 1.5em;
    background: #f5f5f5;
    overflow-y: scroll; /* 세로 스크롤을 추가합니다. */
  }

  table {
    border: 1px #a39485 solid;
    font-size: .9em;
    box-shadow: 0 2px 5px rgba(0,0,0,.25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
  }

  th {
    text-align: left;
  }

  thead {
    position: sticky; /* 고정 위치로 설정 */
    top: 0; /* 맨 위에 고정 */
    z-index: 999; /* 다른 요소 위에 표시되도록 설정 */
    font-weight: bold;
    color: #fff;
    background: #73685d;
  }

  td, th {
    padding: 1em .5em;
    vertical-align: middle;
  }

  td {
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #fff;
  }

  a {
    color: #73685d;
  }

  @media all and (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }

    th {
      text-align: right;
    }

    table {
      position: relative;
      padding-bottom: 0;
      border: none;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
    }

    thead {
      float: left;
      white-space: nowrap;
    }

    tbody {
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      white-space: nowrap;
    }

    tr {
      display: inline-block;
      vertical-align: top;
    }

    th {
      border-bottom: 1px solid #a39485;
    }

    td {
      border-bottom: 1px solid #e5e5e5;
    }
  }
</style>

