import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Genero } from 'src/app/models/genero/genero.module';
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { EstadoCivil } from 'src/app/models/estadocivil/estadocivil.module';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Direccion } from 'src/app/models/direccion/direccion.module';
import { Entidadfederativa } from './../../../../models/entidadfederativa/entidadfederativa.module';
import { Alcaldia } from 'src/app/models/alcaldia/alcaldia.module';
import { DireccionService } from 'src/app/servicios/direccion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public paciente:Paciente;
  public genero:Genero;
  public estadoCivil:EstadoCivil;

  public entidadFederativa:Entidadfederativa;
  public alcaldia:Alcaldia;
  public direccion:Direccion;

  public generos;
  public estadosCiviles;

  public entidadesFederativas;
  public alcaldias;

  id:number;
  edicion:boolean=false;



  constructor(
    private servicioPaciente:PacienteService,
    private servicioDireccion:DireccionService,
    private route:ActivatedRoute,
    private router:Router
    
  ) {
    this.genero = new Genero(2,'Femenino');
    this.estadoCivil = new EstadoCivil(1,'Soltero/a');
   
    this.entidadFederativa= new Entidadfederativa(1,'algo');
    this.alcaldia  = new Alcaldia (1,'algo');
    this.direccion = new Direccion (this.entidadFederativa,this.alcaldia,'',null,'','','');
    this.paciente  = new Paciente (60000,'','','',null,'','',null,null,this.genero,this.estadoCivil,this.direccion, new Date());

  }

  ngOnInit(): void {

    console.log(this.genero);
         this.route.params.subscribe((params:Params) =>{
              this.id=params['id'];
              this.edicion = this.id!=null;
          });

      if(this.edicion){
          /*Servicio que obtiene la lista de todos los pacientes */
          this.servicioPaciente.getPacientesId(this.id).subscribe(resultado=>{
            this.paciente= resultado;
            this.direccion= this.paciente.direccion;
            console.log(this.paciente.genero);
          });
          /*FIN*/
      }

     /*Servicio que obtiene todos los Generos*/
     this.servicioPaciente.getAllGenero().subscribe(
      respuesta =>{
        this.generos = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/

    /*Servicio que obtiene todos los los Estados Civiles*/
    this.servicioPaciente.getAllEstadoCivil().subscribe(
      respuesta =>{
        this.estadosCiviles = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/

    /*Servicio Que obtiene todas las entidades Federativas*/
    this.servicioDireccion.getAllEntidadesFederativas().subscribe(
      respuesta =>{
        this.entidadesFederativas = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/

    /*Servicio Que obtiene todas las Alcaldias*/
    this.servicioDireccion.getAlcaldias().subscribe(
      respuesta =>{
        this.alcaldias = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/
  }

  onSubmit(){
    this.paciente.genero=this.genero;
    this.paciente.estadoCivil=this.estadoCivil;
    this.paciente.fechaAlta=new Date();

    this.direccion.entidadFederativa= this.entidadFederativa;
    this.direccion.alcaldiaMunicipio = this.alcaldia;
    this.paciente.direccion=this.direccion;
    //console.log(this.paciente.fechaAlta);
 

    if(this.edicion){
    //Actualizar
    console.log("En actualizar");
    console.log(this.paciente);
     /* Servicio que registra a un nuevo Paciente*/
     this.servicioPaciente.actualizarPaciente(this.paciente).subscribe(
      respuesta =>{
        console.log(  respuesta);
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/
    }else{
    //Crear
     
     /* Servicio que registra a un nuevo Paciente*/
     console.log(this.paciente);
     this.servicioPaciente.registrarPaciente(this.paciente).subscribe(
      respuesta =>{
        console.log(  respuesta);
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/
    }
  
 
  }



}
