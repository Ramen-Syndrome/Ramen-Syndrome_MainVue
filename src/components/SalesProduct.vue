<script setup>
import { ref } from 'vue'

async function jsons() {
    const response = await fetch("http://localhost:3000/posts");
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

const jsonData = ref(null);

// 데이터를 가져와 jsonData 변수에 할당합니다.
jsons().then(data => {
    jsonData.value = data;
});
</script>

<template>
<div>
    <h1>JSON Server 데이터</h1>
        <li v-for="aaa in jsonData" :key="key">
            {{ aaa.상품명 }}
        </li>
</div>
</template>
