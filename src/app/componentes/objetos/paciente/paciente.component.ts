import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/models/genero/genero.module';
import { EstadoCivil } from 'src/app/models/estadocivil/estadocivil.module';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers:[PacienteService]
})
export class PacienteComponent implements OnInit {
  public paciente:Paciente;
  public genero:Genero;
  public estadoCivil:EstadoCivil;

  constructor(
    private servicioPaciente:PacienteService,
    private route:ActivatedRoute,
    private router:Router

  ) { 
    this.genero = new Genero(1,'Masculino');
    this.estadoCivil = new EstadoCivil(1,'Soltero/a');
    this.paciente = new Paciente (6,'3Gil','Colin','Velasco',27,'colin@gmail.com','QAWSEDRFTGYH123456',99999999,55245678,this.genero,this.estadoCivil);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.servicioPaciente.registrarPaciente(this.paciente).subscribe(
      respuesta =>{
        console.log(  respuesta);
      },
      error=>{
        console.log(<any>error);
      }
    )

  }

}
