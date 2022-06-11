import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Author from "../views/AuthorView.vue";
import { useUserStore } from "../stores/user.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("../views/PostsView.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    component: () => import("../views/PostView.vue"),
  },
  {
    path: "/create-post",
    name: "create-post",
    component: () => import("../views/CreatePostView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/authors",
    name: "authors",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AuthorsView.vue"),
  },
  { path: "/author/:username", name: "author", component: Author },

  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/product/:id", component: () => import("../views/ProductView.vue") }, // example: http://localhost:8080/product/12343
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/gears",
    name: "gears",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/GearsView.vue"),
  },
  {
    path: "/gear/:id",
    component: () => import("../views/GearView.vue"),
  },
  {
    path: "/studio",
    name: "studio",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/StudioView.vue"),
  },
  {
    path: "/routes",
    name: "routes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/RoutesListView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  console.log(useUserStore().isAuthenticated);
  if (
    // make sure the user is authenticated
    !useUserStore().isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== "login"
  ) {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;
