
import { t } from 'src/boot/i18n';

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                path: '', 
                component: () => import('src/pages/Home.vue'),
                name: 'home',
            },
            {
                path: 'dataSheet/:motoId',
                name: 'dataSheet',
                component: () => import('pages/DataSheet.vue'),
                meta: {
                    backButtonLink: 'back',
                    headerTitle: t('dataSheet'),
                },
            },
            {
                path: 'reservations/:motoId',
                name: 'reservations',
                component: () => import('pages/Reservations.vue'),
                meta: {
                    backButtonLink: 'back',
                    headerTitle: t('reservation'),
                },
            },
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue')
    }
];

export default routes;
