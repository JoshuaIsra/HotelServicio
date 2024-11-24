import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


const APIURL ='http://127.0.0.1:8000/api/';
@Injectable({
  providedIn: 'root'
})
export class ApipersonalService {
  private _http=inject(HttpClient);
  constructor() { }

  getPersonal(){
    return this._http.get<any[]>(APIURL + 'personal/all');
  }

  getPersonalId(id: number){
    return this._http.get<any>(`${APIURL}personal/${id}`);
  }

  createPersonal(personal: any){
    return this._http.post<any>(APIURL + 'personal/new', personal);
  }
  
  updatePersonal(id: number, personal: any) {
    return this._http.put<any>(`${APIURL}personal/update/${id}`, personal); 
  }
  deletePersonal(id:any){
    const personalId = parseInt(id, 10); 
    return this._http.delete<void>(`${APIURL}personal/delete/${id}`);
  }
}
