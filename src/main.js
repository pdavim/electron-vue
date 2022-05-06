import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "vuetify/styles"; // Global CSS has to be imported
import { createPinia } from "pinia";
// import VueCompositionApi from "@vue/composition-api";

import { loadFonts } from "./plugins/webfontloader";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

loadFonts();

createApp(App).use(createPinia()).use(router).use(vuetify).mount("#app");
