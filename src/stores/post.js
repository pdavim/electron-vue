// @ts-check
/**
 * @typedef {object} User
 */
import { defineStore } from "pinia";
import axios from "axios";
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";

import { useUserStore } from "../stores/user.js";

const URL_STAGE = "https://jsonplaceholder.typicode.com/posts";
const URL_DEV = "https://pdavim.com";

const access_token = sessionStorage.getItem("jwt_token");
axios.defaults.baseURL = "https://pdavim.com";

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    /** @type Array */
    posts: [],
    post: null,
    tags: null,
    tagsById: null,
    categories: null,
    categoriesId: null,
    /** @type boolean */
    isLoading: false,
    error: null,
    /** @type {User[]} */
    user: [],
    /** @type String */
    token: "",
    totalPosts: "",
    /** @type String */
    role: "",
    totalPages: "",
    /** @type boolean */
    isAuthenticated: false,
    taxonomies: null,
    /** @type Object */
    indexList: {},
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId) =>
        state.posts.filter((post) => post.userId === authorId);
    },
  },
  actions: {
    // Auth JWT
    async getJWT(/** @type String */ username, /** @type String */ password) {
      if (!this.isAuthenticated) {
        this.isLoading = true;
        await axios
          .post("wp-json/api/v1/token", {
            /** @type String */
            username: username,
            /** @type String */
            password: password,
          })
          .then((res) => {
            console.log("res", res.data.jwt_token);
            if (this.token === null) {
              /** @type String */
              this.token = res.data.jwt_token;
              /** @type Boolean */
              this.isAuthenticated = true;
              sessionStorage.setItem("jwt_token", this.token);
            } else {
              /** @type String */
              this.token = "";
              this.token = res.data.jwt_token;
              this.isAuthenticated = true;
              sessionStorage.setItem("jwt_token", this.token);
            }
          })
          .then((res) => {
            this.getIndex();
            this.getTypes();
            this.getTypeBySlug();
            this.getTags();
            this.getCategories();
            //   this.getTaxonomies();
          })
          .then((res) => {
            /** @ts-check-ignore */
            useUserStore().getCurrentUser(this.token);
            //getCurrentUserGetter();
            useUserStore().isAuthenticated = true;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            console.error("error", err);
          });
      }
    },

    // Rest API POSTS
    async getIndex() {
      await axios
        .get("/wp-json/wp/v2/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.indexList = res.data;
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

      this.isLoading = true;
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
          /** @type Array */
          this.posts = res.data;

          console.log(this.posts);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getPostByID(/** @type number */ postID) {
      this.post = null;
      this.isLoading = true;
      let theURL = `/wp-json/wp/v2/posts/${postID}`;
      await axios
        .get(theURL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.post = res.data;
        })
        .then(() => (this.isLoading = false))
        .catch((err) => {
          console.log(err);
        });
    },

    // API USERS
    async getCurrentUser() {
      await axios
        .get("/wp-json/wp/v2/users/me?context=edit", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          return this.userMapper(res.data);
        })
        .then((res) => {
          this.userDispatcher(res);
          /** @type String */
          this.role = res.roles[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    userMapper: (/** @type object */ data) => {
      /** @returns object */
      return {
        /**  @type number */
        id: data.id,
        /**  @type String */
        email: data.email,
        /**  @type String */
        firstName: data.first_name,
        /**  @type String */
        lastName: data.last_name,
        /**  @type String */
        name: data.name,
        /**  @type String */
        nickname: data.nickname,
        /**  @type String */
        registered_date: data.registered_date,
        /**  @type String */
        username: data.username,
        /**  @type String */
        avatar_url: data.avatar_urls[96],
        /**  @type Array */
        capabilities: data.capabilities,
        /**  @type String */
        description: data.description,
        /**  @type String */
        locate: data.locale,
        /**  @type Array */
        meta: data.meta,
        /**  @type Array */
        roles: data.roles,
        /**  @type String */
        slug: data.slug,
      };
    },

    userDispatcher: function (/** @type object */ arg) {
      /** @type object */
      this.user = arg;
    },
  },
});
