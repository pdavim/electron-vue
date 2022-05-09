<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/post.js";

const { posts, loading, error, isAuthenticated } = storeToRefs(usePostStore());
const { getPosts } = usePostStore();

getPosts().then(() => console.log(posts));
</script>

<template>
  <main>
    <div v-if="isAuthenticated">
      <p v-if="loading">Loading posts...</p>
      <p v-if="error">{{ error.message }}</p>
      <div v-if="posts">
        <div v-for="post in posts" :key="post.id">
          {{ post.title.rendered }}
          <RouterLink :to="`/post/${post.id}`">
            <p v-html="post.title.rendered"></p>
          </RouterLink>
          <p v-html="post.excerpt.rendered"></p>
        </div>
      </div>
    </div>
    <div v-else>please login first</div>
  </main>
</template>
