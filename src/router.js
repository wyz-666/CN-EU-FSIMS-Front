import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('./pages/Login.vue'),
        meta: {
            title: '登录',
        }
    },
    {
        path: '/',
        name: 'Register',
        component: () => import('./pages/Register.vue'),
        meta: {
            title: '注册',
        }
    },
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            // {
            //     path: '/',
            //     name: 'login',
            //     component: () => import('./components/Login.vue')
            // },
            {
                path: '/pasturedataupload',
                name: '/pasturedataupload',
                component:()=>('./components/PastureDataUpload.vue')
            },
            {
                path: '/slaughterdataupload',
                name: 'slaughterdataupload',
                component:()=>('./components/SlaughterDataUpload.vue')
            },
            {
                path:'/companyAdmin',
                name:'companyAdmin',
                component:()=>import('./components/Company.vue')
            },
            {
              path:'/addPasture',
              name:'addPasture',
              component:()=>import('./components/AddPasture.vue')
            },
            {
                path:'/addSlaughter',
                name:'addSlaughter',
                component:()=>import('./components/AddSlaughter.vue')
            },
            {
                path:'/addpacket',
                name:'addpacket',
                component:()=>import('./components/AddPacket.vue')
            },
            {
                path:'/addtransport',
                name:'addtransport',
                component:()=>import('./components/AddTransportFactory.vue')
            },
            {
              path: '/slaughteradmin',
              name: 'slaughteradmin'  ,
                component:()=>import('./components/SlaughterAdmin.vue')
            },
            {
                path: '/packetadmin',
                name: 'packetadmin'  ,
                component:()=>import('./components/PacketAdmin.vue')
            },
            {
                path: '/transportadmin',
                name: 'transportadmin'  ,
                component:()=>import('./components/TransportFactoryAdmin.vue')
            },
            {
                path:'/addOperatorUser',
                name:'addOperatorUser',
                component:()=>import('./components/AddOperatorUser.vue')
            },
            {
                path:'/addUser',
                name:'addUser',
                component:()=>import('./components/AddUser.vue')
            },
            {
              path: '/viewlogs',
              name:'viewlogs',
              component:()=>import('./components/Logs.vue')
            },
            {
                path:'/addDriver',
                name:'addDriver',
                component:()=>import('./components/AddDriver.vue')
            },
            {
                path:'/addPacketUser',
                name:'addPacketUser',
                component:()=>import('./components/AddPacketUser.vue')
            },
            {
                path: '/administration',
                name: 'administration' ,
                component: () => import('./components/Admin.vue')
            },
            {
                path: '/operator',
                name: 'operator' ,
                component: () => import('./components/OperatorAdmin.vue')
            },
            {
                path: '/packet',
                name: 'packet' ,
                component: () => import('./components/PacketAdmin.vue')
            },
            {
                path: '/driver',
                name: 'driver' ,
                component: () => import('./components/ColdChainDriverAdmin.vue')
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('./components/Home.vue')
            },

            {
                path: '/pasture',
                name: 'pasture',
                component: () => import('./components/Dashboard.vue')
            },
            {
                path: '/fattening',
                name: 'fattening',
                component: () => import('./components/Fattening.vue')
            },
            {
                path: '/pre_slaughter',
                name: 'pre_slaughter',
                component: () => import('./components/PreSlaughter.vue')
            },
            {
                path: '/slaughter',
                name: 'slaughter',
                component: () => import('./components/Slaughter.vue')
            },
            {
                path: '/pack',
                name: 'pack',
                component: () => import('./components/Pack.vue')
            },
            {
                path: '/transport',
                name: 'transport',
                component: () => import('./components/Transport.vue')
            },
            {
                path: '/sell',
                name: 'sell',
                component: () => import('./components/Sell.vue')
            },
            {
                path: '/produce',
                name: 'produce',
                component: () => import('./components/Produce.vue')
            },
            {
                path: '/track',
                name: 'track',
                component: () => import('./components/Track.vue')
            },
            {
                path: '/evaluate',
                name: 'evaluate',
                component: () => import('./components/Track.vue')
            },
            {
                path: '/predict',
                name: 'predict',
                component: () => import('./components/Predict.vue')
            },
            {
                path: '/suggest',
                name: 'suggest',
                component: () => import('./components/Pollution.vue')
            },
            {
                path: '/alert',
                name: 'alert',
                component: () => import('./components/Track.vue')
            },
            {
                path: '/analyze',
                name: 'analyze',
                component: () => import('./components/RiskAnalyze.vue')
            },
            {
                path: '/chain',
                name: 'chain',
                component: () => import('./components/BlockChain.vue')
            },
            {
                path: '/slaughteroperate',
                name: 'slaughteroperate',
                component: () => import('./components/SlaughterOperate.vue')
            },
            {
                path: '/packoperate',
                name: 'packoperate',
                component: () => import('./components/PackOperate.vue')
            },
            {
                path: '/pastureoperate',
                name: 'pastureoperate',
                component: () => import('./components/PastureOperate.vue')
            },
            {
                path: '/coldtransport',
                name: 'coldtransport',
                component: () => import('./components/ColdTransport.vue')
            },
            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('./components/FormLayoutDemo.vue')
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('./components/InputDemo.vue')
            },
            {
                path: '/floatlabel',
                name: 'floatlabel',
                component: () => import('./components/FloatLabelDemo.vue')
            },
            {
                path: '/invalidstate',
                name: 'invalidstate',
                component: () => import('./components/InvalidStateDemo.vue')
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('./components/ButtonDemo.vue')
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('./components/TableDemo.vue')
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('./components/ListDemo.vue')
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('./components/TreeDemo.vue')
            },
            {
                path: '/panel',
                name: 'panel',
                component: () => import('./components/PanelsDemo.vue')
            },
            {
                path: '/overlay',
                name: 'overlay',
                component: () => import('./components/OverlayDemo.vue')
            },
            {
                path: '/media',
                name: 'media',
                component: () => import('./components/MediaDemo.vue')
            },
            {
                path: '/menu',
                component: () => import('./components/MenuDemo.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('./components/menu/PersonalDemo.vue')
                    },
                    {
                        path: '/menu/seat',
                        component: () => import('./components/menu/SeatDemo.vue')
                    },
                    {
                        path: '/menu/payment',
                        component: () => import('./components/menu/PaymentDemo.vue')
                    },
                    {
                        path: '/menu/confirmation',
                        component: () => import('./components/menu/ConfirmationDemo.vue')
                    },
                ],
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('./components/MessagesDemo.vue')
            },
            {
                path: '/file',
                name: 'file',
                component: () => import('./components/FileDemo.vue')
            },
            {
                path: '/chart',
                name: 'chart',
                component: () => import('./components/ChartDemo.vue')
            },
            {
                path: '/misc',
                name: 'misc',
                component: () => import('./components/MiscDemo.vue')
            },
            {
                path: '/crud',
                name: 'crud',
                component: () => import('./pages/CrudDemo.vue')
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('./pages/TimelineDemo.vue')
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('./components/EmptyPage.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('./components/Documentation.vue')
            },
            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('./components/BlocksDemo.vue')
            },
            {
                path: '/icons',
                name: 'icons',
                component: () => import('./components/IconsDemo.vue')
            }
        ]
    },

    {
        path: '/register',
        name: 'register',
        component: () => import('./pages/Register.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;