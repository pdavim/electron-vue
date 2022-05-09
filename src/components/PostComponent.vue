<script setup>
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";

import { usePostStore } from "../stores/post.js";

const { loading, error, isAuthenticated, post } = storeToRefs(usePostStore());
let object = post._object.posts;

console.log("post componet ", object);
</script>

<template>
  <div>
    <div>
      <h2>{{ post.title.rendered }}</h2>
      <p v-html="post.content.rendered"></p>
    </div>
    <hr />
  </div>
</template>
