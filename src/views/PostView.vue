<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthorStore } from "../stores/author";
import { usePostStore } from "../stores/post";
import Post from "../components/PostComponent.vue";

const route = useRoute();
const { post, loading, error } = storeToRefs(usePostStore());
const { getPostByID } = usePostStore();
console.log(post);
getPostByID(route.params.id);
console.log(post);
</script>

<template>
  <div>
    <p v-if="loading">Loading post...</p>
    <p v-if="error">{{ error.message }}</p>
    <p v-if="post">
      <post :post="post"></post>
    </p>
  </div>
</template>
