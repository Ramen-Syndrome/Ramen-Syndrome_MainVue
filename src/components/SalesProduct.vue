<script setup>
import { ref } from 'vue';

async function jsons() {
    const response = await fetch("http://localhost:3000/sales");
    const jsonData = await response.json();
    return jsonData;
}

const jsonData = ref([]);
let filteredData = ref([]);
let searchTerm = ref('');

// 데이터를 가져와 jsonData 변수에 할당합니다.
jsons().then(data => {
    // 중복된 상품명을 제거하고 총 매출을 계산합니다.
    const uniqueProducts = data.reduce((acc, cur) => {
        const existingProduct = acc.find(item => item.상품명 === cur.상품명);
        if (existingProduct) {
            existingProduct.판매가 += cur.판매가;
            existingProduct.원가 += cur.원가;
            existingProduct.판매갯수++;
        } else {
            acc.push({ ...cur, 판매갯수: 1 });
        }
        return acc;
    }, []);
    jsonData.value = uniqueProducts;
filteredData.value = uniqueProducts;
});

let sortBySalesCountDescending = true;

function searchProduct() {
    if (!searchTerm.value) {
        filteredData.value = jsonData.value; // 검색어가 없을 때는 모든 데이터를 filteredData에 복사합니다.
        return;
    }
    filteredData.value = jsonData.value.filter(product => product.상품명.includes(searchTerm.value));
}


function sortBySalesCount() {
    // 판매 갯수 내림차순
    if (sortBySalesCountDescending) {
        jsonData.value.sort((a, b) => b.판매갯수 - a.판매갯수);
    } else {
        // 판매 갯수 오름차순
        jsonData.value.sort((a, b) => a.판매갯수 - b.판매갯수);
    }
    sortBySalesCountDescending = !sortBySalesCountDescending;
}

function sortByTotalSales() {
    // 총 매출액
    jsonData.value.sort((a, b) => (b.판매가 - b.원가) - (a.판매가 - a.원가));
}

function sortByName() {
    // 이름 순 정렬
    jsonData.value.sort((a, b) => a.상품명.localeCompare(b.상품명));
}

</script>

<template>
  <div>
    <h1>상품별 매출 내역</h1>
    <button @click="sortByName">이름 순 정렬</button>
    <!-- 판매 갯수 버튼 수정 -->
    <button @click="sortBySalesCount">판매 갯수 순위 보기</button>
    <button @click="sortByTotalSales">총 매출액 순위 보기</button>
<input type="text" v-model="searchTerm" placeholder="검색어를 입력하세요">
    <button @click="searchProduct">상품 검색</button>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>상품명</th>
            <th>개당 원가</th>
            <th>개당 판매가</th>
            <th>판매 갯수</th>
            <th>개당 매출액</th>
            <th>원가</th>
            <th>판매가격</th>
            <th>총 매출액</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredData" :key="product.상품명">
            <td>{{ product.상품명 }}</td>
            <td>{{ product.원가 / product.판매갯수 }}</td>
            <td>{{ product.판매가 / product.판매갯수 }}</td>
            <td>{{ product.판매갯수 }}</td>
            <td>{{ (product.판매가 - product.원가) / product.판매갯수 }}</td>
            <td>{{ product.원가 }}</td>
            <td>{{ product.판매가 }}</td>
            <td>{{ product.판매가 - product.원가 }}</td>
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

