import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
public urlMaster
public TOKEN_AUTH_USERNAME= 'hospitalClinica11';
public TOKEN_AUTH_PASSWORD= 'clinicaHospital11';
  constructor(
    private http : HttpClient,
    private router : Router) {
    this.urlMaster='http://localhost:8090/';
    
  }

  
  autenticarse(usuario, password):Observable<any>{
   let header= new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UFT-8').set('Authorization', 'Basic '+ btoa(this.TOKEN_AUTH_USERNAME + ':' + this.TOKEN_AUTH_PASSWORD));
   const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    return this.http.post(this.urlMaster+'oauth/token',body,{headers:header});
  }

  estaLogueado(){
    let tokenExiste = sessionStorage.getItem('access_token');
    return tokenExiste !=null;
  }

  cerrarSesion(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  

}
