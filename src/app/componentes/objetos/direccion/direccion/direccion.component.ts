import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Paciente } from 'src/app/models/paciente/paciente.module';
import { Entidadfederativa } from 'src/app/models/entidadfederativa/entidadfederativa.module';
import { Alcaldia } from 'src/app/models/alcaldia/alcaldia.module';
import { Direccion } from 'src/app/models/direccion/direccion.module';



@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {
  public entidadFederativa:Entidadfederativa;
  public alcaldia:Alcaldia;
  public direccion:Direccion;

  public entidadesFederativas;
  public alcaldias;

  constructor() {
    
    }

  ngOnInit(): void {

  }

 


  

}
