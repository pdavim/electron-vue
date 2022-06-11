<template>
  <div>
    <h1>Routes</h1>
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
<style scoped>
li {
  font-size: 12px;
  border: blue;
  border-style: solid;
  width: fit-content;
  padding: 3px 13px;
  border-width: 1px;
  border-radius: 5px;
  list-style: none;
  margin: 5px 0px;
}
</style>
