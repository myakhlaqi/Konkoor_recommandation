import Vue from 'vue'
import Router from 'vue-router'
import auth from "../database/auth";

let routes = [
    {
        path: '/login', component: require('../components/user/Login.vue'),
        meta: {
            forVisitors: true
        }
    },
    {
        path: '/register', component: require('../components/user/Login.vue'),
        meta: {
            forVisitors: true
        }
    },

    {
        path: '/', component: require('../components/Home.vue'),
        meta: {breadcrumb: 'صفحه اصلی', path: '/', icon: 'fa fa-home', forAuth: true},
        children: [
            //Path Null: redirect to Home
            {path: '/', redirect: '/home'},

            //Path Home show startPage
            {path: 'home', component: require('../pages/StartPage.vue')},

            //Path Projects with its Child show Project Page
            {
                path: 'projects', component: require('../pages/ProjectsPage.vue'),
                meta: {breadcrumb: 'پروژه ها', path: '/projects', icon: 'fa fa-balance-scale'},
                //Start of projects child
                children: [

                    //path null show Projects List in projectPage
                    {path: '/', component: require('../components/project/ProjectsList.vue')},
                    {
                        path: 'addProject', component: require('../components/project/newProject.vue'),
                        meta: {
                            breadcrumb: 'پروژه حدید',
                            path: 'addProject',
                            icon: ''
                        }
                    },
                    {
                        path: 'project/:id', component: require('../components/project/ProjectView.vue'),
                        props: true,
                        meta: {
                            breadcrumb: 'پروژه 1',
                            path: 'project',
                            icon: ''
                        }
                    }
                    //End of Projects Child
                ]

            },
        ]
    },
    { path: "*", component: require('../pages/404.vue'), meta: {
        forVisitors: true
    } }

];
Vue.use(Router);



const router = new Router({
    routes,
    mode: 'history'
});


router.beforeEach(
    (to, from, next) => {
        if (to.matched.some(record => record.meta.forVisitors)) {
            if (auth.isAuthenticated.value) {
                next({path: '/'})
            } else {
                next()
            }
        } else if (to.matched.some(record => record.meta.forAuth)) {

            if (auth.isAuthenticated.value) {
                next();
            } else {
                next({path: '/login'})
            }
        } else {
            next()
        }
    }
);




export default router
