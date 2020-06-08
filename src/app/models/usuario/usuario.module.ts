import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Usuario { 

  constructor( 
    public id:Number,
    public nombreUsuario:String,
    public password:String,
   // public fechaAlta:Date

   
  ){

  }
}
