import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable({
  providedIn: 'root'
})
export class PacienteService {
public urlMaster:String;
  constructor(
    public http : HttpClient
  ) {
    this.urlMaster='http://localhost:8090/';
   }


   getAllGenero():Observable<any>{
     let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
     let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.get(this.urlMaster+'generos/genero',{headers:header});
  }

  getAllEstadoCivil():Observable<any>{
    return this.http.get(this.urlMaster+'estadosciviles/estadocivil');

  }

  getAllPacientes():Observable<any>{
    
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.get(this.urlMaster+'pacientes/paciente',{headers:header});
  }

  getPacientesId(id):Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.get(this.urlMaster+`pacientes/paciente/${id}`,{headers:header});
  }

  registrarPaciente(paciente):Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.post(this.urlMaster+'pacientes/nuevo',paciente,{headers:header});
  }

  actualizarPaciente(paciente):Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.put(this.urlMaster+'pacientes/editar',paciente,{headers:header});
  }

  eliminarPaciente(id):Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.delete(this.urlMaster+`pacientes/eliminar/${id}`);
  }

  getCountGenero():Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.get(this.urlMaster+'pacientes/countGenero');
  }

  postFile(uploadImageData):Observable<any>{

    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.post(this.urlMaster+'imagenes/nueva',uploadImageData);
  }

  getImagenId(id):Observable<any>{
    let access_token = JSON.parse(sessionStorage.getItem('access_token')).access_token;
    let header= new HttpHeaders().set('Authorization', `bearer ${access_token}`);
    return this.http.get(this.urlMaster+`imagenes/imagen/${id}`);
  }

  
  

}
