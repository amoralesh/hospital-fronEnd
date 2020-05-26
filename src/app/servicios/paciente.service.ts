import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Paciente } from 'src/app/models/paciente/paciente.module';



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
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'generos/genero');
  }

  getAllEstadoCivil():Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'estadosciviles/estadocivil');

  }

  getAllPacientes():Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'pacientes/paciente');
  }

  getPacientesId(id):Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+`pacientes/paciente/${id}`);
  }

  registrarPaciente(paciente):Observable<any>{
    let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.urlMaster+'pacientes/nuevo',paciente,{headers:header});
  }

  actualizarPaciente(paciente):Observable<any>{
    let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.urlMaster+'pacientes/editar',paciente,{headers:header});
  }

  eliminarPaciente(id):Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.urlMaster+`pacientes/eliminar/${id}`);
  }

  getCountGenero():Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'pacientes/countGenero');
  }

  postFile(uploadImageData):Observable<any>{

    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.urlMaster+'imagen/nueva',uploadImageData);
  }

  
  

}
