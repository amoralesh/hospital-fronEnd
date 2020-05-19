import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entidadfederativa } from '../entidadfederativa/entidadfederativa.module';
import { Alcaldia } from '../alcaldia/alcaldia.module';
import { Paciente } from '../paciente/paciente.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Direccion {
  constructor(
  
    public entidadFederativa:Entidadfederativa,
    public alcaldiaMunicipio:Alcaldia,
    public colonia:String,
    public codigoPostal:Number,
    public calle:String,
    public numeroExterior:String,
    public numeroInterior:String,
   // public paciente:Paciente
  ){

  }
 }
