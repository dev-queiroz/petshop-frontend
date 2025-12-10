// src/lib/router.tsx
import { createRouter } from '@tanstack/react-router';
import { queryClient } from './queryClient';
import { Route } from '@/routes/__root';

export type RouterContext = {
    queryClient: typeof queryClient;
    auth: {
        user: ReturnType<typeof import('@/stores/auth').useAuthStore.getState>['user'];
    };
};

export const router = createRouter({
    routeTree: Route,
    defaultPreload: 'intent',
    defaultPreloadDelay: 200,
    context: {
        queryClient,
        auth: { user: null },
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}