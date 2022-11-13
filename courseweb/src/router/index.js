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
      component: () => import("../views/clientHome"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/login",
      component: () => import("../views/clientLogin"),
    },
    {
      path: "/register",
      component: () => import("../views/clientRegister"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      ElMessage.error('请先登录');
      router.push('/login')
    }
  }else{
    next()
  }
});
export default router;
