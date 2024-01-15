import {createRouter, createWebHistory} from 'vue-router';
import axios from "axios";
import {getCookie} from "../../controllers/cookie.js";
import StartAdmin from "@/components/admin/StartAdmin.vue";
import StartStudent from "@/components/student/StartStudent.vue";
import Banner from "@/components/test components/Banner.vue";
import isAdminMiddleware from "../../middlewares/userMiddlewares.js";
import Admin from "@/components/Admin.vue";
import CreateEvent from "@/components/admin/CreateEvent.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Banner',
            component: Banner
        },
        // admin routes
        {
            path: '/admin',
            name: 'Admin',
            beforeEnter: isAdminMiddleware ,
            component: Admin,
            children: [
                {
                    path: '',
                    name: 'StartAdmin',
                    component: StartAdmin
                },
                {
                    path: 'create-event',
                    name: 'CreateEvent',
                    component: CreateEvent,
                },
            ]
        },
        // student routes
        {
            path: '/student',
            name: 'StartStudent',
            component: StartStudent
        }
    ]
});

export default router;