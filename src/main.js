import { createApp } from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "vuetify/styles"; // Global CSS has to be imported
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

import { loadFonts } from "./plugins/webfontloader";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";

loadFonts();

createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueAxios, axios)
  .use(vuetify)
  .mount("#app");
