<template>
  <div id="login">
    <div class="login-page">
      <transition name="fade">
        <div v-if="isLoading" class="wallpaper-login">Loading...</div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
        <div class="row">
          <div class="ccol-12">
            <div
              v-if="!registerActive"
              class="card login"
              v-bind:class="{ error: emptyFields }"
            >
              <h1>Sign In</h1>
              <form class="form-group">
                <input
                  v-model="emailLogin"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  required
                />
                <input
                  v-model="passwordLogin"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <input type="submit" class="btn btn-primary" @click="doLogin" />
                <p>
                  Don't have an account?
                  <a
                    href="#"
                    @click="
                      (registerActive = !registerActive), (emptyFields = false)
                    "
                    >Sign up here</a
                  >
                </p>
                <p><a href="#">Forgot your password?</a></p>
              </form>
            </div>

            <div
              v-else
              class="card register"
              v-bind:class="{ error: emptyFields }"
            >
              <h1>Sign Up</h1>
              <form class="form-group">
                <input
                  v-model="emailReg"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  required
                />
                <input
                  v-model="passwordReg"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
                <input
                  v-model="confirmReg"
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  required
                />
                <input
                  type="submit"
                  class="btn btn-primary"
                  @click="doRegister"
                />
                <p>
                  Already have an account?
                  <a
                    href="#"
                    @click="
                      (registerActive = !registerActive), (emptyFields = false)
                    "
                    >Sign in here</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/post.js";

const { posts, isLoading, error } = storeToRefs(usePostStore());
const store = usePostStore();

export default {
  data() {
    return {
      registerActive: false,
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

<style lang="scss" scoped>
#login {
  position: absolute;
  width: 100%;
}

p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group {
  input {
    margin-bottom: 20px;
  }
}

.login-page {
  align-items: center;
  display: flex;
  height: 90.8vh;

  .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
      no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
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
    z-index: -1;
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
</style>
