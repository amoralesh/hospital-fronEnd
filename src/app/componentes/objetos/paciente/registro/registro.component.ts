import { Component, OnInit, SimpleChanges } from '@angular/core';
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
import { ImagenUsuario } from 'src/app/models/imagenUsuario/imagenusuario.module';
import { NgxSpinnerService } from 'ngx-spinner';


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
  public imagenUsuario:ImagenUsuario;

  public generos;
  public estadosCiviles;

  public entidadesFederativas;
  public alcaldias;
  public idEntidadFederativa;

  //para cambiar el idioma del datapicket a español
  es: any;
  locale: string;

  // variable para recuperar id de url en caso que sea edición
  idUrlEditar:number;
  //saber si es nuevo o edición de pacientes
  edicion:boolean=false;

  //tratamiento de imagen
  uplo: File;
  public imagenPacienteFormulario;
  public uploadImageData;

  //RECUPERAR IMAGEN
  public base64;

  //CONTENER Y EVIAR AL SERVIDOR LA IMAGEN EN BASE64
  public base64File;

  constructor(
    private servicioPaciente:PacienteService,
    private servicioDireccion:DireccionService,
    private route:ActivatedRoute,
    private router:Router,
    //para mostrar el mensaje del toast
    private messageService: MessageService,
    //para cambiar el idioma del datapicket a español
    private dateAdapter: DateAdapter<Date>,
    private spinner: NgxSpinnerService
   
    
  ) {

    //para cambiar el idioma del datapicket a español
    this.locale = 'es';
    this.dateAdapter.setLocale('es');

    this.genero = new Genero(2,'Femenino');
    this.estadoCivil = new EstadoCivil(1,'Soltero/a');
   
    this.entidadFederativa= new Entidadfederativa(1,'algo');
    this.alcaldia  = new Alcaldia (1,'',null);
    this.direccion = new Direccion (this.entidadFederativa,this.alcaldia,'',null,'','','');
    this.paciente  = new Paciente (60000,'','','',null,null,'','',null,null,this.genero,this.estadoCivil,this.direccion, new Date(),this.imagenUsuario);

  }


  
  ngOnInit(): void {
    //ESTE SERVICIO SE REALIZA PARA CONOCER SI LA URL CONTIENE ID, PARA SABER SI SE MUESTRAN DATOS 
    //PARA LA EDICION DEL PACIENTE O SE MANDA EL PACIENTE DE FAULT PARA SU CREACIÓN
         this.route.params.subscribe((params:Params) =>{
         this.idUrlEditar=params['id'];

         //Si idUrlEditar es diferente a null(que si encontro id) entonces edicion = true
         this.edicion = this.idUrlEditar!=null; 

      if(this.edicion){
        this.spinner.show();
          /*Servicio que obtiene la lista de todos los pacientes */
          this.servicioPaciente.getPacientesId(this.idUrlEditar).subscribe(resultado=>{
          this.paciente= resultado;
          this.direccion= this.paciente.direccion;
          this.alcaldias =this.obtenerAlcaldias(this.paciente.direccion.entidadFederativa.id);
          this.base64 = atob(this.paciente.imagenUsuario.imagenByte as string);
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
          console.log(this.paciente);
          });
          /*FIN SERVICIO PARA RECUPERAR PACIENTE*/
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
    /*FIN ENTIDAD FEDERATIVA*/

  });//FIN DE EDICION/NUEVO

  }//FIN NGONINIT



  onSubmit(){
    if(this.edicion){
    //Actualizar
     /* Servicio que registra a un nuevo Paciente*/
     this.servicioPaciente.actualizarPaciente(this.paciente).subscribe(
      respuesta =>{
        this.paciente = respuesta;
        this.base64=atob(this.paciente.imagenUsuario.imagenByte as string);
       
        this.spinner.show();
      

        setTimeout(() => {
          this.showInfoUpdate();
          this.router.navigate(['paciente','editar',respuesta.id]); 
          this.spinner.hide();
        }, 1000);

      },
      error=>{
        console.log(<any>error);
      }
    );
   
    /*FIN*/
    }else{
    //Crear
    this.paciente.genero=this.genero;
    this.paciente.estadoCivil=this.estadoCivil;
    this.paciente.imagenUsuario = this.imagenUsuario;
    this.paciente.direccion=this.direccion;
    this.direccion.entidadFederativa= this.entidadFederativa;
    this.direccion.alcaldiaMunicipio = this.alcaldia;
  
     /* Servicio que registra a un nuevo Paciente*/
     this.servicioPaciente.registrarPaciente(this.paciente).subscribe(
      respuesta =>{

        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['paciente','editar',respuesta.id]);
        }, 2000);
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN*/
    }
  

  }/*FIN DE onSubmit */

  //METODO QUE OBTIENE LAS ALCALDIAS DEPENDIENDO DEL ID DE MUNICPIO
  
  obtenerAlcaldias(event){
    /*Servicio Que obtiene todas las Alcaldias*/
    this.servicioDireccion.getAlcaldias(event).subscribe(
      respuesta =>{
        this.alcaldias = respuesta;
      },
      error=>{
        console.log(<any>error);
      }
    );
    /*FIN ALCALDIAS*/
}

    /*METODO PARA MOSTRAR EL TOAST DE PRIMENG */
    showSuccess() {
      this.messageService.add({severity:'success', summary: 'El Paciente: '+this.paciente.nombre+' '+this.paciente.apellidoP, detail:'Fue registrado con exito',life:5000});
  }//

      /*METODO PARA MOSTRAR EL TOAST DE PRIMENG */
      showInfoUpdate() {
        this.messageService.add({severity:'info', summary: 'El Paciente: '+this.paciente.nombre+' '+this.paciente.apellidoP, detail:'Fue actualizado con exito',life:5000});
    }//

  onUpload(event) {
    for ( this.imagenPacienteFormulario of event.files) {
      this.uplo = this.imagenPacienteFormulario;
     
    }
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(this.imagenPacienteFormulario);
    reader.onload = function () {
      
    me.base64File = btoa(reader.result as string);

    if(me.edicion){
      me.paciente.imagenUsuario.imagenByte = me.base64File;
      me.paciente.imagenUsuario.nombre = me.imagenPacienteFormulario.name;
      me.paciente.imagenUsuario.type = me.imagenPacienteFormulario.type; 
    //  console.log(me.paciente.imagenUsuario);

    }else{
      me.imagenUsuario = new ImagenUsuario(666666,me.base64File,me.imagenPacienteFormulario.name,me.imagenPacienteFormulario.type);
      //console.log(me.imagenUsuario);
    }

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };



    // this.imagenUsuario = new ImagenUsuario(null,this.base64File as string,this.imagenPacienteFormulario.name,this.imagenPacienteFormulario.type);
    // console.log(this.imagenUsuario);
  

    //Esta metodo es la manera usada con java para mandar como un FormData la imagen
    // this.uploadImageData = new FormData();
    // this.uploadImageData.append('miArchivo', this.imagenPacienteFormulario, this.imagenPacienteFormulario.name);
        //this.uploadFileToActivity();



   // this.imagenUsuario =this.uploadImageData;
    //this.imagenUsuario= this.imagenPacienteFormulario;

    
   
  }//FIN onUpload

 // Servico para mandar al backend la imagen como FormData()
  // uploadFileToActivity() {
  //   this.servicioPaciente.postFile(this.uploadImageData).subscribe(data => {
  //     alert('Success');
  //   }, error => {
  //     console.log(error);
  //   });
  // }

 //FUNCION PARA CONVERTIR UN FILE EN BASE 64

//  getBase64(event) {
//   let me = this;
//   let file = event.target.files[0];
//   let reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function () {
//     //me.modelvalue = reader.result;
//     console.log(reader.result);
//   };
//   reader.onerror = function (error) {
//     console.log('Error: ', error);
//   };
// }

//FUNCION PARA CONVERTIR UN BASE64 EN BYTE ARRAY

//  base64ToArrayBuffer(base64) {
//   var binary_string = window.atob(base64);
//   var len = binary_string.length;
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//       bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes.buffer;
// }



}
