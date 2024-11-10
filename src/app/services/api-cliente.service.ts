import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
const APIURL ='http://127.0.0.1:8000/api/';
@Injectable({
  providedIn: 'root'
})
export class ApiClienteService {
  private _http = inject(HttpClient);
  constructor() { }
  

  getClientes(){
    return this._http.get<any[]>(APIURL + 'cliente/all');
  }

  getCliente(id: number){
    return this._http.get<any>(`${APIURL}cliente/${id}`);
  }

  createCliente(cliente: any){
    return this._http.post<any>(APIURL + 'cliente/new', cliente);
  }

  updateCliente(id: number, cliente: any) {
    return this._http.put<any>(`${APIURL}cliente/update/${id}`, cliente); 
  }

  deleteCliente(id:any){
    const clienteId = parseInt(id, 10); 
    return this._http.delete<void>(`${APIURL}cliente/delete/${id}`);
  }
}
