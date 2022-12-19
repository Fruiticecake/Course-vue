import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      name: "/Home",
      component: () => import("@/views/clientHome"),
      meta: {
        isAuth: true,
      },
      alwaysShow: true,
      children: [
        {
          path: "front",
          component: () => import("@/components/clientMain"),
          name: "FrontPageList",
          meta: { title: "前端课程", noCache: true, index: 1 },
        },
        {
          path: "back",
          component: () => import("@/components/clientMain"),
          name: "BackPageList",
          meta: { title: "后端课程", noCache: true, index: 2 },
        },
        {
          path: "all",
          component: () => import("@/components/clientMain"),
          name: "AllPageList",
          meta: { title: "全栈课程", noCache: true, index: 3 },
        },
        {
          path: "users/student/list",
          component: () => import("@/views/user/student/List"),
          name: "UserStudentPageList",
          meta: { title: "学生列表", noCache: true, index: 4 },
        },
        {
          path: "users/student/edit",
          component: () => import("@/views/user/student/Edit"),
          name: "UserStudentEdit",
          meta: { title: "学生编辑", noCache: true, index: 5 },
        },
        {
          path: "users/admin/list",
          component: () => import("@/views/user/admin/List"),
          name: "UserAdminPageList",
          meta: { title: "管理员列表", noCache: true, index: 6 },
        },
        {
          path: "users/admin/edit",
          component: () => import("@/views/user/admin/Edit"),
          name: "UserAdminEdit",
          meta: { title: "管理员编辑", noCache: true, index: 7 },
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../views/clientLogin"),
    },
    {
      path: "/register",
      component: () => import("../views/clientRegister"),
    },
    {
      path: "/:pathMatch(.*)",
      hidden: true,
      component: () => import("@/views/error/404"),
      meta: { title: "404", noCache: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      ElMessage.error("请先登录");
      router.push("/login");
    }
  } else {
    next();
  }
});
export default router;
