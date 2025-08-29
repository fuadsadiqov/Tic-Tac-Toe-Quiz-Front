import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CharactersComponent } from './character/character.component';


export const adminRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: "full" },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'attributes/:id', component: AttributesComponent },
    { path: 'characters/:id', component: CharactersComponent },
    { path: 'users', component: UsersComponent },
];