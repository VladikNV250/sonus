import { index, layout, route, type RouteConfig } from '@react-router/dev/routes'

export default [
    layout('pages/Layout.tsx', [
        index('pages/Tuner/TunerPage.tsx'),
        route('guitar', 'pages/GuitarTuner/GuitarTunerPage.tsx'),
    ]),
] satisfies RouteConfig
