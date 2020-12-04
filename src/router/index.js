import Vue from "vue";
import VueRouter from "vue-router";
const Login = () => import("../components/login.vue");
const dashboard = () => import("../views/main.vue");
const product = () => import("../components/product/product.vue");
const supplier = () => import("../components/supplier/supplier.vue");
const purchase = () => import("../components/purchase/purchase.vue");
const addpurchase = () => import("../components/purchase/addpurchase.vue");
const staff = () => import("../components/staff/staff.vue");
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
    children: [
      {
        path: "product",
        components: {
          dashboard: product,
        },
      },
      {
        path: "supplier",
        components: {
          dashboard: supplier,
        },
      },
      {
        path: "purchase",
        components: {
          dashboard: purchase,
        },
      },
      {
        path: "addpurchase",
        components: {
          dashboard: addpurchase,
        },
      },
      {
        path: "staff",
        components: {
          dashboard: staff,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
