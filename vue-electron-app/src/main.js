import { createApp } from "vue";
// import Vue from "vue";
// import { VueRouter } from "vue-router";
// import { BootstrapVue } from "bootstrap-vue";
import router from "./router";

//import "./main.scss";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);
// Vue.config.productionTip = false;
// Vue.use(router);
const app = createApp(App);
app.use(router).mount("#app");
//createApp(App).mount("#app");
