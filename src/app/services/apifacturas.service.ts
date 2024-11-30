import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Factura } from '../Model/Facturas';
const APIURL = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ApifacturasService {
  private _http =inject(HttpClient);
  constructor() { }
  getFacturas(){
    return this._http.get<Factura[]>(APIURL + 'factura/all');
  }

  getFactura(id: number){
    return this._http.get<Factura>(`${APIURL}factura/${id}`);
  }
  crearFactura(factura: any){
    return this._http.post<Factura>(APIURL + 'factura/new', factura);
  }

  updateFactura(id: number, factura: any) {
    return this._http.put(`${APIURL}factura/update/${id}`, factura);
  }
  deleteFactura(id: any){
    const facturaId = parseInt(id, 10);
    return this._http.delete<void>(`${APIURL}factura/delete/${id}`);
  }
  getReservaById(id: number) {
    return this._http.get<any>(`/api/reservas/${id}`); // Ajusta la ruta según tu API
  }
}
