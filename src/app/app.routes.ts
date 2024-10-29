import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'home',       
    component :HomeComponent
    },

    {
        path: 'hab-form/:id',
        component: HomeComponent,
        title: 'Habitaciones Form'
    },
    {
        path: '**',
        redirectTo: 'home',  
        pathMatch: 'full'
    }
];
