<template class="app">
  <v-app>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-navigation-drawer v-model="drawer" bottom temporary app>
      <ClockSidebarComponent />
      <UserSidebarComponent />
      <v-list-item to="/">Home</v-list-item>
      <v-list-item to="/posts">Posts</v-list-item>
      <v-list-item to="/create-post">Create Post</v-list-item>
      <v-list-item to="/profile">Profile</v-list-item>
      <v-list-item to="/login">Login</v-list-item>
      <v-list-item to="/logout">Logout</v-list-item>
    </v-navigation-drawer>

    <v-app-bar color="primary" prominent app>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>my wp</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>

      <v-btn variant="text" icon="mdi-filter"></v-btn>

      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>

    <v-main>
      <transition>
        <v-container fluid>
          <router-view />
        </v-container>
      </transition>
    </v-main>
    <v-footer app>
      <FooterComponent id="footer" />
    </v-footer>
  </v-app>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import ClockSidebarComponent from "./components/ClockSidebarComponent.vue";
import UserSidebarComponent from "./components/UserSidebarComponent.vue";
export default {
  name: "App",
  components: {
    FooterComponent,
    ClockSidebarComponent,
  },

  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style scoped>
#nav {
  z-index: 2;
  position: absolute;
  width: 100%;
}

.v-card-text {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.bg-primary {
  background: #0d6efd !important;
  color: rgb(var(--v-theme-on-primary)) !important;
}

.v-main {
  margin: 0;
  padding: 0;
}

.v-container--fluid {
  padding: 0;
}
</style>
