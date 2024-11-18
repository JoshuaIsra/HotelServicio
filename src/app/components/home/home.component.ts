import { Component, inject, Input, OnInit } from '@angular/core';
import { Habitaciones } from '../../Model/Habitaciones';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { jsDocComment } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

constructor() { 
  }

  ngOnInit(): void {
  //     console.log('Hola mundo');  
  //     // this.getHabitaciones();
  //     // this.creaHavitacion();
  //     // this.deletaHabitacio();

 }


  }
  







