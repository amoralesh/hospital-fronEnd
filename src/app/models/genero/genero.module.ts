import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Genero {

  constructor(
    public id:Number,
    public etiqueta:String,
   
  ){

  }
 }
