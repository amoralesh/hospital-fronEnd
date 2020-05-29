import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ImagenUsuario {

  constructor(
    public id:Number,
    public imagenByte:String,
    public nombre:String,
    public type:String
   
  ){

  }
 }
