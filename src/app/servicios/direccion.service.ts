import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  public urlMaster:String;

  constructor(private http:HttpClient) {
    this.urlMaster='http://localhost:8090/'
   }

   getAllEntidadesFederativas():Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'entidadesfederativas/entidadfederativa');
  }

  getAlcaldias(idEntidadFederativa):Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+`alcaldias/municipio/alcaldia/${idEntidadFederativa}`);
  }
}
