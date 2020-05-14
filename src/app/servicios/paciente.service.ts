import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Paciente } from 'src/app/models/paciente/paciente.module';



@Injectable({
  providedIn: 'root'
})
export class PacienteService {
public ulrMaster:String;
  constructor(
    public http : HttpClient
  ) {
    this.ulrMaster='localhost:8090';
   }

   registrarPaciente(paciente){
     let json =paciente;
     console.log(paciente);
     let parametros = 'json='+json;
     let header= new HttpHeaders().set('Content-Type', 'application/json');
     return this.http.post('http://localhost:8090/pacientes/nuevo',paciente,{headers:header});

   }
}
