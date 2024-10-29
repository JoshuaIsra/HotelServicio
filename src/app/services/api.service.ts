import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitaciones } from '../Model/Habitaciones';
const APIURL ='http://127.0.0.1:8000/api/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);
  constructor(  ) { } 
  getHabitaciones(){

    return this._http.get(APIURL + 'habitacion/all');
  }

  getHabitacion(id:number){
    return this._http.get(APIURL + 'habitacion/'+id);
  }

}
