// src/routes/__root.tsx
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';
import { type RouterContext } from '@/lib/router';

export const Route = createRootRouteWithContext<RouterContext>()({
    beforeLoad: async ({ location }) => {
        const { token, user } = useAuthStore.getState();

        if (!token) {
            throw redirect({
                // to: '/login',
                search: { redirect: location.href },
            });
        }

        // Passa o user pro contexto das rotas filhas
        return {
            auth: { user },
        };
    },

    component: () => {
        const { auth } = Route.useRouteContext();
        const user = auth.user;

        return (
            <div className="min-h-screen bg-background text-foreground">
                {/* Layout global (Sidebar + Header) virá depois */}
                {user ? (
                    <div>
                        {/* <Header /> <Sidebar /> */}
                        <Outlet />
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        );
    },
});