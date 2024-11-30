import { Component, inject, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Habitaciones } from '../../Model/Habitaciones';
import { Router } from '@angular/router';
import { HabitacionFormComponent } from "../habitacion-form/habitacion-form.component";
import { CommonModule, CurrencyPipe,JsonPipe } from '@angular/common';

@Component({
  selector: 'app-habitacion',
  standalone: true,
  imports: [ HabitacionFormComponent,CurrencyPipe,CommonModule,JsonPipe],
  templateUrl: './habitacion.component.html',
  styleUrl: './habitacion.component.css'
})
export class HabitacionComponent implements OnInit{
  private habitacionservice = inject(ApiService);
  mostarTabla = false;
  mostrarFormulario = false;
  habitaciones :Habitaciones[] = [];
  private _router = inject(Router);

  
  ngOnInit(): void {
      
    this.loadAllHabitaciones();
  }

  deleteHabitacion(id: any): void {
    const habitacionId = parseInt(id, 10); // asegura que sea número antes de enviarlo al servicio
  this.habitacionservice.deleteHabitacion(habitacionId).subscribe(() => {
    this.loadAllHabitaciones();
    });
  }

  loadAllHabitaciones(): void {
    console.log("Hola")
      this.habitacionservice.getHabitaciones().subscribe((data) => {
        this.habitaciones = data;
        console.log(data);
        console.log(this.habitaciones);
      });
    
  }

  formantServicios(servicios:any){
    const serviciosArray =[];
    if (servicios.wifi) {
      serviciosArray.push('WiFi');
    }
    if (servicios.desayuno) {
      serviciosArray.push('Desayuno');
    }
    if (servicios.aire_acondicionado) {
      serviciosArray.push('Aire Acondicionado');
    }
    if (servicios.tv) {
      serviciosArray.push('TV');
    }
    return serviciosArray.join(', ');
  }

  toggleTable(): void{
    this.mostarTabla = !this.mostarTabla;
    
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  goToEdit(id: number): void {
    this._router.navigate(['/edit/', id]);
  }

  goToNew(): void {
    this._router.navigate(['/habitacion-form']);
  }


}


  


  // getHabitaciones(){  
  //   fetch('http://127.0.0.1:8000/api/habitacion/all')
  //     .then(response => response.json())
  //     .then((json) => console.log(json))

  //   }

  // crearHabitacion(){
  //   fetch('http://127.0.0.1:8000/api/habitacion/new', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         precio_noche: 892.36,
  //         estado: true,
  //         capacidad_personas: 1,
  //         servicios: {
  //       wifi: true
  //   },
  //   numero_camas: 2,
  //   tipo_cama: "S"
  //       }),
  //       headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((json) => console.log(json));

  //   }
  // deletaHabitacio(){
  //   fetch('http://127.0.0.1:8000/api/habitacion/delete/14', {
  //     method: 'DELETE',
  //   });
  // }

