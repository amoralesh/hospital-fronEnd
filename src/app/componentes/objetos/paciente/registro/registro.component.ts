import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Genero } from 'src/app/models/genero/genero.module';
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { EstadoCivil } from 'src/app/models/estadocivil/estadocivil.module';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion/direccion.module';
import { DireccionComponent } from '../../direccion/direccion/direccion.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[DireccionComponent]
})
export class RegistroComponent implements OnInit {

  public paciente:Paciente;
  public genero:Genero;
  public direccion:Direccion;
  public estadoCivil:EstadoCivil;

  
  public generos;
  public estadosCiviles;


  constructor(
    private servicioPaciente:PacienteService,
    private direccionComponente:DireccionComponent,
    private route:ActivatedRoute,
    private router:Router
  ) {
//id:number;
//edicion:boolean=false;
    // this.route.params.subscribe((params:Params) =>{
        //this.id=params['id];
        //this.edicion = this.id!=null;
    //});
  
    this.genero = new Genero(1,'Masculino');
    this.estadoCivil = new EstadoCivil(1,'Soltero/a');
    this.paciente = new Paciente (60000,'','','',0,'','',0,0,this.genero,this.estadoCivil,this.direccionComponente.direccion, new Date());
   
  }

  ngOnInit(): void {

    console.log(this.paciente);

     this.servicioPaciente.getAllGenero().subscribe(
      respuesta =>{
        this.generos = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );

    this.servicioPaciente.getAllEstadoCivil().subscribe(
      respuesta =>{
        this.estadosCiviles = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );
    console.log(this.paciente);
  }

  onSubmit(){
    this.paciente.genero=this.genero;
    this.paciente.estadoCivil=this.estadoCivil;
    this.paciente.fechaAlta=new Date();
    this.paciente.direccion= this.direccionComponente.direccion;
    //console.log(this.paciente.fechaAlta);
   console.log(this.paciente);
   //this.direccionComponente.evento();
   

    // this.servicioPaciente.registrarPaciente(this.paciente).subscribe(
    //   respuesta =>{
    //     console.log(  respuesta);
    //   },
    //   error=>{
    //     console.log(<any>error);
    //   }
    // );
   // this.direccionComponente.onSubmit();
 
  
  }

}
