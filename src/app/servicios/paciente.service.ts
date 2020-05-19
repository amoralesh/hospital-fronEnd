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

   registrarPaciente(paciente):Observable<any>{
     let header= new HttpHeaders().set('Content-Type', 'application/json');
     return this.http.post(this.urlMaster+'pacientes/nuevo',paciente,{headers:header});
   }

   getAllGenero():Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'generos/genero');
  }

  getAllEstadoCivil():Observable<any>{
    //let header= new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.urlMaster+'estadosciviles/estadocivil');

  }
}
