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
    return this._http.get<Habitaciones[]>(APIURL + 'habitacion/all');
  }

  getHabitacion(id: number): Observable<any> {
    return this._http.get<any>(`${APIURL}habitacion/${id}`);
  }

  createHabitacion(habitacion: Habitaciones){
    return this._http.post<Habitaciones>(APIURL + 'habitacion/new', habitacion);
  }

  updateHabitacion(id: number, habitacion: Habitaciones) {
    return this._http.put<Habitaciones>(`${APIURL}habitacion/update/${id}`, habitacion); 
  }
    

  deleteHabitacion(id:any){
    const habitacionId = parseInt(id, 10); // convierte el id a número
    return this._http.delete<void>(`${APIURL}habitacion/delete/${id}`);
}

}
