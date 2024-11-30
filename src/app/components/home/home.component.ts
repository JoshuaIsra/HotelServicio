import { Component, inject, Input, OnInit } from '@angular/core';
import { Habitaciones } from '../../Model/Habitaciones';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsDocComment } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  private Habitacionservice = inject(ApiService);
  habitaciones: Habitaciones[] = [];
  private _router = inject(Router);
  

constructor() { 
  }

  ngOnInit(): void {
    this.getHabitaciones();
    
  }

  getHabitaciones(){
    
    this.Habitacionservice.getHabitaciones().subscribe((data) => {
      this.habitaciones = data;
      console.log(data);
    });
  }

  getHabitacionDispo(habitacion: Habitaciones){
    if (habitacion.estado == true){
      return "Disponible";
    }else{
      return "No Disponible";
    }
    
  }

  goToHabitaciones(id: number){
  
    this._router.navigate(['/habitaciones-cliente','id']);
  }
  }
  







