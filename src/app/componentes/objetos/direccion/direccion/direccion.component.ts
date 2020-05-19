import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { Entidadfederativa } from 'src/app/models/entidadfederativa/entidadfederativa.module';
import { Alcaldia } from 'src/app/models/alcaldia/alcaldia.module';
import { Direccion } from 'src/app/models/direccion/direccion.module';
import { DireccionService } from 'src/app/servicios/direccion.service';


@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  @Input() pacienteDesdePaciente: Paciente;
  public entidadFederativa:Entidadfederativa;
  public alcaldia:Alcaldia;
  public direccion:Direccion;

  public entidadesFederativas;
  public alcaldias;

  constructor(private servicioDireccion:DireccionService) {
     this.entidadFederativa= new Entidadfederativa(1,'algo');
     this.alcaldia = new Alcaldia (1,'algo');
     this.direccion=new Direccion (this.entidadFederativa,this.alcaldia,'lomas',19876,'Jose Maria','85','1');
    }

  ngOnInit(): void {

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

    this.direccion.entidadFederativa= this.entidadFederativa;
    this.direccion.alcaldiaMunicipio = this.alcaldia;
    console.log(this.direccion);

  }


  

}
