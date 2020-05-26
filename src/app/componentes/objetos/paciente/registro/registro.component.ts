import { Component, OnInit } from '@angular/core';
import { Genero } from 'src/app/models/genero/genero.module';
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { EstadoCivil } from 'src/app/models/estadocivil/estadocivil.module';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Direccion } from 'src/app/models/direccion/direccion.module';
import { Entidadfederativa } from './../../../../models/entidadfederativa/entidadfederativa.module';
import { Alcaldia } from 'src/app/models/alcaldia/alcaldia.module';
import { DireccionService } from 'src/app/servicios/direccion.service';
import { MessageService } from 'primeng/api';
import { DateAdapter } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';





@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [MessageService]

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
 //para cambiar el idioma del datapicket a español
  es: any;
  locale: string;

  public uploadedFiles;

  id:number;
  edicion:boolean=false;

  uplo: File;

  public file;
  public uploadImageData;

  public base64;





  constructor(
    private servicioPaciente:PacienteService,
    private servicioDireccion:DireccionService,
    private route:ActivatedRoute,
    private router:Router,
    //para mostrar el mensaje del toast
    private messageService: MessageService,
    //para cambiar el idioma del datapicket a español
    private dateAdapter: DateAdapter<Date>,
    //Esto es para recuperar base64 img
    private domSanitizer: DomSanitizer
   
    
  ) {

    //para cambiar el idioma del datapicket a español
    this.locale = 'es';
    this.dateAdapter.setLocale('es');

    this.genero = new Genero(2,'Femenino');
    this.estadoCivil = new EstadoCivil(1,'Soltero/a');
   
    this.entidadFederativa= new Entidadfederativa(1,'algo');
    this.alcaldia  = new Alcaldia (1,'algo');
    this.direccion = new Direccion (this.entidadFederativa,this.alcaldia,'',null,'','','');
    this.paciente  = new Paciente (60000,'','','',null,null,'','',null,null,this.genero,this.estadoCivil,this.direccion, new Date());

  }
  
  ngOnInit(): void {

         this.route.params.subscribe((params:Params) =>{
         this.id=params['id'];
         this.edicion = this.id!=null;
          

      if(this.edicion){
          /*Servicio que obtiene la lista de todos los pacientes */
          this.servicioPaciente.getPacientesId(this.id).subscribe(resultado=>{
            this.paciente= resultado;
            this.direccion= this.paciente.direccion;
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

  });//FIN DE EDICION/NUEVO
  }



  onSubmit(){
    this.paciente.genero=this.genero;
    this.paciente.estadoCivil=this.estadoCivil;
   // this.paciente.fechaAlta=new Date();

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
        console.log( respuesta);
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/
    }else{
    //Crear
    
   
     /* Servicio que registra a un nuevo Paciente*/
    //  console.log(this.paciente);
    //  this.servicioPaciente.registrarPaciente(this.paciente).subscribe(
    //   respuesta =>{
    //     console.log(  respuesta);
    //     this.showSuccess();
    //     setTimeout(() => {
    //       this.router.navigate(['paciente','editar',respuesta.id]);
    //     }, 2000);
    //   },
    //   error=>{
    //     console.log(<any>error);
    //   }
    // );
    /*FIN*/
    }
  

  }/*FIN DE onSubmit */

  onUpload(event) {
    for ( this.file of event.files) {
      this.uplo = this.file;
      console.log(this.file);
    }

    this.uploadImageData = new FormData();
    this.uploadImageData.append('miArchivo', this.file, this.file.name);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.servicioPaciente.postFile(this.uploadImageData).subscribe(data => {
      alert('Success');
    }, error => {
      console.log(error);
    });
  }


  /*METODO PARA MOSTRAR EL TOAST DE PRIMENG */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'El Paciente: '+this.paciente.nombre+' '+this.paciente.apellidoP, detail:'Fue registrado con exito',life:5000});
}//FIN

//CARGAR IMAGEN 

cargarImagen(){

  this.servicioPaciente.getImagenId(1).subscribe(
    respuesta =>{
      this.base64=respuesta.imagenByte;
      //console.log( respuesta.imagenByte);
    },
    error=>{
      console.log(<any>error);
    }
  );
}

}
