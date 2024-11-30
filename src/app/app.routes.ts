import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HabitacionComponent } from './pages/habitacion/habitacion.component';
import { HabitacionFormComponent } from './pages/habitacion-form/habitacion-form.component';
import { ClienteFormComponent } from './pages/cliente-form/cliente-form.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { ReservaFormComponent } from './pages/reserva-form/reserva-form.component';
import { CommonModule } from '@angular/common';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { FacturasFormComponent } from './pages/facturas-form/facturas-form.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { PersonalFormComponent } from './pages/personal-form/personal-form.component';
import { HabitacionesClienteComponent } from './pages/habitaciones-cliente/habitaciones-cliente.component';

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
        path: 'facturas',component:FacturasComponent
    },
    {
        path: 'personal',component:PersonalComponent
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
        path:'facturas-form',component:FacturasFormComponent
    },
    {
        path:'personal-form',component:PersonalFormComponent
    },
    {
        path:'reservas-form/:id',component:FacturasFormComponent
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
        path: 'edit-factura/:id',component:FacturasFormComponent
    },
    {
        path: 'edit-personal/:id',component:PersonalFormComponent
    },
    {
        path: 'habitaciones-cliente/:id',component:HabitacionesClienteComponent
    },
    {
        path: '**',
        redirectTo: 'home',  
        pathMatch: 'full'
    }
];
