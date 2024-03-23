import {createRouter, createWebHistory} from 'vue-router';
import axios from "axios";
import {getCookie} from "../../controllers/cookie.js";
import StartAdmin from "@/components/admin/StartAdmin.vue";
import StartStudent from "@/components/student/StartStudent.vue";
import Banner from "@/components/test components/Banner.vue";
import isAdminMiddleware from "../../middlewares/userMiddlewares.js";
import Admin from "@/components/Admin.vue";
import CreateEvent from "@/components/admin/CreateEvent.vue";
import CreateOne from "@/components/admin/CreateOne.vue";
import ManageEvents from "@/components/admin/ManageEvents.vue";
import Student from "@/components/Student.vue";
import Register from "@/components/student/Register.vue";
import ChooseEvent from "@/components/student/register/ChooseEvent.vue";
import RegisterForEvent from "@/components/student/register/RegisterForEvent.vue";
import Profile from "@/components/student/Profile.vue";
import Duty from "@/components/Duty.vue";
import Journal from "@/components/duty/Journal.vue";
import ChooseCurrentEvent from "@/components/duty/ChooseCurrentEvent.vue";
import ScanerId from "@/components/duty/journal/ScanerId.vue";

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
                    component: StartAdmin,
                },
                {
                    path: 'create-event',
                    name: 'CreateEvent',
                    component: CreateOne,
                },
                {
                    path: 'manage-events',
                    name: 'ManageEvents',
                    component: ManageEvents,
                }
            ]
        },
        // student routes
        {
            path: '/student',
            name: 'StartStudent',
            component: Student,
            children: [
                {
                    path: '',
                    name: 'StartStudent',
                    component: StartStudent,
                },
                {
                  path: 'profile',
                    name: 'Profile',
                    component: Profile,
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register,
                    children: [
                        {
                            path: '',
                            name: 'ChooseEvent',
                            component: ChooseEvent,
                        },
                        {
                            path: ':id',
                            name: 'RegisterForEvent',
                            component: RegisterForEvent,
                        }
                    ]
                },
            ]
        },
        // routes for duties
        {
          path: '/duty',
            name: 'Duty',
            component: Duty,
            beforeEnter: isAdminMiddleware,
            children: [
                {
                    path: '',
                    name: 'ChooseCurrentEvent',
                    component: ChooseCurrentEvent,
                },
                {
                    path: ':eventId/:location',
                    name: 'Journal',
                    component: Journal,
                    children: [
                        {
                            path: '/scan',
                            name: 'Scan',
                            component: ScanerId,
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;