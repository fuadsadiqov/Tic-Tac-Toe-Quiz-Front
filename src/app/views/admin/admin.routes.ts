import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';


export const adminRoutes: Routes = [
    { path: '', component: DashboardComponent, data: { roles: ['admin','manager'] } },
    { path: 'users', component: UsersComponent, data: { roles: ['admin'] } },
    { path: 'login', loadComponent: () => import('../auth/login/login.component').then(m => m.LoginComponent) },
];