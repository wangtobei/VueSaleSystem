import Vue from "vue";
import VueRouter from "vue-router";
const Login = () => import("../components/login.vue");
const dashboard = () => import("../views/main.vue");
const product = () => import("../components/product/product.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    children: [{ path: "product", components:{
      dashboard:product
    } }],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
