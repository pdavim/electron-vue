<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/post.js";
import { useUserStore } from "../stores/user.js";
const { posts, isLoading } = storeToRefs(usePostStore());
const { isAuthenticated } = storeToRefs(useUserStore());
const { getPosts } = usePostStore();

console.log("posts is authenticated", isAuthenticated);
console.log("posts", posts.value);
let postsobject = posts.value;
if (postsobject.length < 1) {
  getPosts().then(() => console.log(posts));
}
</script>

<template>
  <main>
    <div v-if="isAuthenticated">
      <p v-if="isLoading">Loading posts...</p>
      <p v-if="error">{{ error.message }}</p>
      <div v-if="posts" style="display: flex" class="row">
        <v-card
          v-for="post in posts"
          :key="post.id"
          class="col-4"
          style="margin: 3px; width: 31%"
        >
          <v-img
            :src="post.better_featured_image.source_url"
            height="200px"
            cover
          ></v-img>

          <RouterLink :to="`/post/${post.id}`">
            <v-card-header>
              <v-card-header-text>
                <v-card-title v-html="post.title.rendered"></v-card-title>
                <v-card-subtitle>This is a subtitle</v-card-subtitle>
              </v-card-header-text>
            </v-card-header>
          </RouterLink>
          <v-card-text v-html="post.excerpt.rendered"></v-card-text>
        </v-card>
      </div>
    </div>
    <div v-else>please login first</div>
  </main>
</template>

<style>
.v-main__wrap {
  padding: 20px;
}
</style>
