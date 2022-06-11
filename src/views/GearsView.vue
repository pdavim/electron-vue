<template>
  <div>
    <h1>gears</h1>
    <ul>
      <li v-for="(value, name, index) in indexData.routes" :key="index">
        {{ name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/post.js";
const { posts, isLoading, error, isAuthenticated, indexList } = storeToRefs(
  usePostStore()
);

let indexData = indexList;
console.log(indexData.value.routes);

computed: () => {
  indexData;
};
</script>
<style scoped></style>
