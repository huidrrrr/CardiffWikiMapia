import { lazy } from 'react';

const routes = [
    {
        name: 'Home',
        path: '/',
        element: lazy(() => import('../pages/Home'))
    },
    {
        name: 'NotFound',
        path: '/*',
        element: lazy(() => import('../pages/NotFound'))
    },
    {
        name: 'DashBoard',
        path: '/dashboard',
        element: lazy(() => import('../pages/DashBoard'))
    },
    {
        name: 'QueueManager',
        path: '/queueManager',
        element: lazy(() => import('../pages/QueueManager'))
    },
    {
        name: 'PointHubSelecterManager',
        path: '/pointHubSelecterManager',
        element: lazy(() => import('../pages/PointHubSelecterManager'))
    },
    {
        name: 'PointHubManager',
        path: '/pointHubManager',
        element: lazy(() => import('../pages/PointHubManager'))
    },
    {
        name: 'PointManager',
        path: '/pointManager',
        element: lazy(() => import('../pages/PointManager'))
    }
]

export default routes;