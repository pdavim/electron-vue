import { defineStore } from "pinia";
import axios from "axios";
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";

const URL_STAGE = "https://jsonplaceholder.typicode.com/posts";
const URL_DEV = "https://pdavim.com";

const access_token = sessionStorage.getItem("jwt_token");
axios.defaults.baseURL = "https://pdavim.com";

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    posts: [],
    post: null,
    tags: null,
    tagsById: null,
    categories: null,
    categoriesId: null,
    loading: false,
    error: null,
    user: null,
    token: "",
    totalPosts: "",
    totalPages: "",
    isAuthenticated: false,
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId) =>
        state.posts.filter((post) => post.userId === authorId);
    },
  },
  actions: {
    async getJWT(username, password) {
      if (!this.isAuthenticated) {
        this.isLoading = true;
        await axios
          .post("wp-json/api/v1/token", {
            username: username,
            password: password,
          })
          .then((res) => {
            console.log("res", res.data.jwt_token);
            if (this.token === null) {
              this.token = res.data.jwt_token;
              this.isAuthenticated = true;
            } else {
              this.token = "";
              this.token = res.data.jwt_token;
            }
          })
          .then((res) => {
            this.getIndex();
            this.getTypes();
            this.getTypeBySlug();
            this.getTags();
            this.getCategories();
            //   this.getTaxonomies();
            this.isAuthenticated = true;
            this.isLoading = false;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },

    async getIndex() {
      await axios
        .get("/wp-json/wp/v2/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log("index data ", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async getPageCount() {
      await axios
        .head("/wp-json/wp/v2/posts/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          // console.log(res.headers);
          this.totalPosts = res.headers["x-wp-total"];
          this.totalPages = res.headers["x-wp-totalpages"];

          console.log(
            `there are ${this.totalPosts} posts divided in ${this.totalPages} pages`
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },

    async getTypes() {
      await axios
        .get("/wp-json/wp/v2/types/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getTypeBySlug(slugName = "post") {
      let singleType = `/wp-json/wp/v2/types/${slugName}`;

      await axios
        .get(singleType, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getTags() {
      console.log("tags");
      await axios
        .get("wp-json/wp/v2/tags", {
          params: {
            per_page: 100,
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log("tags", res.data);
          this.tags = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getTagById(tagsId) {
      console.log("tags");
      this.tagsById = null;
      this.loading = true;
      let theURL = `/wp-json/wp/v2/tags/${tagsId}`;
      await axios
        .get(theURL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.tagsById = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getCategories() {
      console.log("categories");
      await axios
        .get("wp-json/wp/v2/categories", {
          params: {
            per_page: 100,
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log("categories", res.data);
          this.categories = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getCategoriesById(categoryId) {
      console.log("tags");
      this.categoriesId = null;
      this.loading = true;
      let theURL = `/wp-json/wp/v2/categories/${categoryId}`;
      await axios
        .get(theURL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.categoriesId = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getTaxonomies() {
      console.log("taxonomies");
      await axios
        .get("wp-json/wp/v2/taxonomies", {
          params: {
            per_page: 100,
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log("taxonomies", res.data);
          this.taxonomies = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getPosts(numberOfPosts = 10, pageNumber = 1) {
      this.posts = [];

      this.loading = true;
      // console.log("token getPosts ", this.token);
      await axios
        .get("/wp-json/wp/v2/posts/", {
          params: {
            per_page: numberOfPosts,
            page: pageNumber,
          },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.posts = res.data;

          console.log(this.posts);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getPostByID(postID) {
      this.post = null;
      this.loading = true;
      let theURL = `/wp-json/wp/v2/posts/${postID}`;
      await axios
        .get(theURL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.post = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // USERS
    /*  getCurrentUser: async function () {
      console.log("user");
      await axios
        .get("/wp-json/wp/v2/users/me", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          console.log("user", res.data);
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }, */
  },
});
