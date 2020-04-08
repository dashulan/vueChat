const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    name: "chat",
    path: "/chat/:name",
    component: () => import("pages/WatsApp.vue"),
    props: true,
  },
  {
    path: "/home",
    component: () => import("pages/Home.vue"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("pages/Register.vue"),
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue"),
  });
}

export default routes;
