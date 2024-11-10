import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Reserva from '../Model/Reserva';
const APIURL ='http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ApirerservasService {
  private _http = inject(HttpClient);
  constructor() { }

  getRerservas(){
    return this._http.get(APIURL + 'reserva/all');
  }

  // En ApirerservasService
getReserva(id: number): Observable<Reserva> {
  return this._http.get<Reserva>(APIURL+`reserva/${id}`);
}


  createReserva(reserva: any){
    return this._http.post(APIURL + 'reserva/new', reserva);
  }

  updateReserva(id: number, reserva: any) {
    return this._http.put(`${APIURL}reserva/update/${id}`, reserva);
  }

  deleteReserva(id:any){
    const habitacionId = parseInt(id, 10); 
    return this._http.delete(`${APIURL}reserva/delete/${id}`);  
  }
}
