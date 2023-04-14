import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        component: () => import('../template/three.vue'),
        path: '/',
        children: [
            // THREEJS模板
            {
                component: () => import('../views/test.vue'),
                path: 'test'
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export { router }