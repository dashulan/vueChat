const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    name: "chat",
    path: "/chat",
    component: () => import("pages/WatsApp.vue")
  },
  {
    path: "/home",
    component: () => import("pages/Home.vue")
  },
  {
    name: "login",
    path: "/login",
    component: () => import("pages/Login.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
