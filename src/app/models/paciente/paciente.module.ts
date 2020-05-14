import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Genero } from '../genero/genero.module';
import { EstadoCivil } from '../estadocivil/estadocivil.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Paciente {
  constructor(
    public id:Number,
    public nombre:String,
    public apellidoP:String,
    public apellidoM:String,
    public edad:Number,
    public correo:String,
    public curp:String,
    public telefono:Number,
    public telefonoCelular:Number,
    public genero:Genero,
    public estadoCivil:EstadoCivil
  ){

  }
 }
