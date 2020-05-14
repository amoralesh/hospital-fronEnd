import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EstadoCivil { 
  
  constructor(
    public id:Number,
    public etiqueta:String,
   
  ){

  }
}
