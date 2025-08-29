import { Routes } from '@angular/router';
import { ClientComponent } from './views/client/client.component';
import { clientRoutes } from './views/client/client.routes';
import { adminRoutes } from './views/admin/admin.routes';
import { authRoutes } from './views/auth/auth.routes';
import { AdminGuard } from '../core/guards/admin.guard';
import { AdminComponent } from './views/admin/admin.component';
import { HomeComponent } from './views/client/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            ...clientRoutes
        ],
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            ...adminRoutes
        ],
        canActivate: [AdminGuard],
        canActivateChild: [AdminGuard],
    },
    {
        path: 'auth',
        children: [
            ...authRoutes
        ]
    },
];
