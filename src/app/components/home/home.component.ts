import { Component, inject, Input, OnInit } from '@angular/core';
import { Habitaciones } from '../../Model/Habitaciones';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() habitacion:any ={};
  habitaciones:any[]=[];
  private _habitacion = inject(ApiService);

constructor() { 
  this.getHabitaciones();
  }

  getHabitaciones(){
     this._habitacion.getHabitaciones().subscribe((data:any)=>{
      this.habitaciones = data;
      console.log(this.habitaciones);
    });
  }

  getHabitacion(id:number){
    this._habitacion.getHabitacion(id).subscribe((data:any)=>{
      this.habitacion = data;
      console.log(this.habitacion);
    });
  }
}







