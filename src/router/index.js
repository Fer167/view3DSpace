import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    meta: { layout: "default" },
    component: MainPage,
  },
  {
    path: "/3DModels",
    name: "3DModels",
    meta: { layout: "default" },
    component: () => import("../views/3DModels.vue"),
  },
  {
    path: "/MyProfile",
    name: "MyProfile",
    meta: { layout: "default" },
    component: () => import("../views/MyProfile.vue"),
  },
  {
    path: "/EditProfile",
    name: "EditProfile",
    meta: { layout: "default" },
    component: () => import("../views/EditProfile.vue"),
  },
  {
    path: "/AddModel",
    name: "AddModel",
    meta: { layout: "default" },
    component: () => import("../views/AddModel.vue"),
  },
  {
    path: "/EditModel",
    name: "EditModel",
    meta: { layout: "default" },
    component: () => import("../views/EditModel.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
