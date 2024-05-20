import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuideView from '@/views/GuideView.vue'
import BoardView from '@/views/BoardView.vue'
import LoginView from '@/views/LoginView.vue'
// import MyPageView from '@/views/MyPageView.vue'

import BoardCreate from '@/components/board/BoardCreate.vue'
import BoardList from '@/components/board/BoardList.vue'
import BoardUpdate from '@/components/board/BoardUpdate.vue'
import BoardDetail from '@/components/board/BoardDetail.vue'
import UserTable from '@/components/user/UserTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
      children: [
        {
          path: '',
          name: 'boardList',
          component: BoardList
        },
        {
          path: ':id',
          name: 'boardDetail',
          component: BoardDetail
        },
        {
          path: 'create',
          name: 'boardCreate',
          component: BoardCreate
        },
        {
          path: 'update',
          name: 'boardUpdate',
          component: BoardUpdate
        },
      ]
    },
    // {
    //   path: '/mypage',
    //   name: 'myPage',
    //   component: MyPageView,
    //   children: [
    //     {
    //       path: ':id',
    //       name: 'userTable',
    //       component: UserTable
    //     },
    //   ]
    // },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router
