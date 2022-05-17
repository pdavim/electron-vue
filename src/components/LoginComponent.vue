<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="info">
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account"
          name="login"
          label="Login"
          type="text"
          v-model="emailLogin"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="mdi-lock"
          name="password"
          label="Password"
          type="password"
          v-model="passwordLogin"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" color="info" @click="doLogin">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/post.js";

const { posts, isLoading, error } = storeToRefs(usePostStore());
const store = usePostStore();

export default {
  name: "LoginComponent",
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      emptyFields: false,
    };
  },

  methods: {
    async doLogin() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        await store.getJWT(this.emailLogin, this.passwordLogin);
        console.log("token doLogin ", store.token);
        if (store.token !== "") {
          await store.getIndex(),
            await store.getPageCount(),
            await store.getTypes(),
            await store.getTypeBySlug(),
            // await store.getCurrentUser();
            console.log("your are login");
        } else {
          console.log("login failed");
        }
      }
    },

    doRegister() {
      if (
        this.emailReg === "" ||
        this.passwordReg === "" ||
        this.confirmReg === ""
      ) {
        this.emptyFields = true;
      } else {
        alert("You are now registered");
      }
    },
  },
};
</script>

<style>
.mdi-account::before {
  font-size: 34px;
}

.card .login {
  display: none;
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-contained.elevation-12 {
  background-color: #ffffffeb;
}
</style>
