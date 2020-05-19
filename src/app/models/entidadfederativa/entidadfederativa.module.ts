import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Entidadfederativa { 
    
  constructor(
    public id:Number,
    public etiqueta:String,
   
  ){

  }
}
