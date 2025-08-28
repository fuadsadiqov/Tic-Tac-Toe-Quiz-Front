import { Routes } from '@angular/router';
import { ClientComponent } from './views/client/client.component';
import { clientRoutes } from './views/client/client.routes';
import { adminRoutes } from './views/admin/admin.routes';
import { authRoutes } from './views/auth/auth.routes';

export const routes: Routes = [
    {
        path: '',
        children: [
            ...clientRoutes
        ]
    },
    {
        path: 'admin',
        children: [
            ...adminRoutes
        ]
    },
    {
        path: 'auth',
        children: [
            ...authRoutes
        ]
    },
];
