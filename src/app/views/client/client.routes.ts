import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameTemplateComponent } from './game-template/game-template.component';

export const clientRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'game/:id', component: GameTemplateComponent },
];