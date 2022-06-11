<template>
  <div id="login">
    <div class="login-page">
      <div class="wallpaper-register"></div>

      <div class="container">
        <div class="row">
          <div class="col-12">
            <div
              v-if="!registerActive"
              class="card login"
              v-bind:class="{ error: emptyFields }"
            >
              <LoginComponent v-if="!auth" />
              <loading :active="loading" :is-full-page="true" />
              <span v-if="auth" class="logged-message"
                >You are already logged</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
// @ts-check

// Import component
import Loading from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/post.js";
import LoginComponent from "../components/LoginComponent.vue";
import { useUserStore } from "@/stores/user.js";

const { posts, isLoading, error, isAuthenticated } = storeToRefs(
  usePostStore()
);
const store = usePostStore();

export default {
  components: { LoginComponent, Loading },
  data() {
    return {
      /** @type boolean */
      registerActive: false,
      /** @type string */
      emailLogin: "",
      /** @type string */
      passwordLogin: "",
      /** @type string */
      emailReg: "",
      /** @type string */
      passwordReg: "",
      /** @type string */
      confirmReg: "",
      /** @type boolean */
      emptyFields: false,
      loading: isLoading,
      auth: isAuthenticated,
    };
  },

  methods: {
    async doLogin() {
      if (this.emailLogin === "" || this.passwordLogin === "") {
        this.emptyFields = true;
      } else {
        console.log(this.loading);
        this.loading = true;
        console.log(this.loading);
        await store.getJWT(this.emailLogin, this.passwordLogin);
        console.log("token doLogin ", store.token);
        if (store.token !== "") {
          await store.getIndex();
          await store.getPageCount();
          await store.getTypes();
          await store.getTypeBySlug();
          // await store.getCurrentUser();
          console.log("your are login");
          this.loading = false;
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

<style lang="scss" scoped>
span.logged-message {
  padding: 65px;
}

#login {
  position: absolute;
  width: 100%;
}

p {
  line-height: 1rem;
}

.card {
  padding: 0;
}

.form-group {
  input {
    margin-bottom: 20px;
  }
}
.v-main__wrap {
  padding: 0;
}

.login-page {
  align-items: center;
  display: flex;
  height: 94vw;
  position: fixed;
  width: 100vw;

  .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
      no-repeat center center;
    background-size: cover;
    height: 100%;
    position: fixed !important;
    width: 100%;
  }

  .login-page .wallpaper-register {
    position: fixed !important;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .wallpaper-register {
    background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
      no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 0;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}

.v-card.v-theme--light.v-card--density-default.v-card--variant-contained.elevation-12 {
  width: 350px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
  margin-top: 15%;
  flex-direction: column;
}

.vld-background {
  background: #0000009e;
}
</style>
