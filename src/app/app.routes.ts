import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HabitacionComponent } from './pages/habitacion/habitacion.component';
import { HabitacionFormComponent } from './pages/habitacion-form/habitacion-form.component';

export const routes: Routes = [
    {
        path: 'home',component :HomeComponent
    },
    {
        path: 'cliente',component:ClienteComponent
    },
    {
        path:'habitacion',component:HabitacionComponent
    },
    {
        path: 'habitacion-form',component:HabitacionFormComponent
    },
    {
        path:'edit/:id',
        component:HabitacionFormComponent
    },
    {
        path: '**',
        redirectTo: 'home',  
        pathMatch: 'full'
    }
];
