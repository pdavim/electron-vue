// @ts-check
/**
 * @typedef {object} User
 */
import { defineStore } from "pinia";
import axios from "axios";

const URL_STAGE = "https://jsonplaceholder.typicode.com/posts";
const URL_DEV = "https://pdavim.com";

const access_token = sessionStorage.getItem("jwt_token");
axios.defaults.baseURL = "https://pdavim.com";

export const useUserStore = defineStore({
  id: "post",
  state: () => ({
    /** @type boolean */
    isLoading: false,
    error: null,
    /** @type {User[]} */
    user: [],
    /** @type String */
    token: "",
    /** @type String */
    role: "",
    /** @type boolean */
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
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
