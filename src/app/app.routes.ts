import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HabitacionComponent } from './pages/habitacion/habitacion.component';
import { HabitacionFormComponent } from './pages/habitacion-form/habitacion-form.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { ReservaFormComponent } from './pages/reserva-form/reserva-form.component';

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
        path:'reservas',component:ReservasComponent
    },
    {
        path: 'habitacion-form',component:HabitacionFormComponent
    },
    {
        path:'cliente-form',component:ClienteFormComponent
    },
    {
        path:'reservas-form',component:ReservaFormComponent
    },
    {
        path:'edit/:id',
        component:HabitacionFormComponent
    },
    {
        path: 'edit-cliente/:id',
        component:ClienteFormComponent
    },
    
    {
        path: 'edit-habitacion/:id',
        component:HabitacionFormComponent
    },
    {
        path: 'edit-reserva/:id',component:ReservaFormComponent
    },
    {
        path: '**',
        redirectTo: 'home',  
        pathMatch: 'full'
    }
];
