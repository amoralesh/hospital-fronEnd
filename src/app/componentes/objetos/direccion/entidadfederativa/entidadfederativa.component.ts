import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { DireccionService } from 'src/app/servicios/direccion.service';
import { Entidadfederativa } from 'src/app/models/entidadfederativa/entidadfederativa.module';

@Component({
  selector: 'app-entidadfederativa',
  templateUrl: './entidadfederativa.component.html',
  styleUrls: ['./entidadfederativa.component.css']
})
export class EntidadfederativaComponent implements OnInit {

//@Output() entidadesFederativasR = new EventEmitter<any>();

public entidadesFederativas:Entidadfederativa;
  constructor(private servicioDireccion:DireccionService) {

    // this.servicioDireccion.getAllEntidadesFederativas().subscribe(
    //   respuesta =>{
    //     this.entidadesFederativas = respuesta;
    //     console.log(this.entidadesFederativas);
    //     this.entidadesFederativasR.emit(this.entidadesFederativas);
    //   },
    //   error=>{
    //     console.log(<any>error);
    //   }
    // );
   
    
   }

  ngOnInit(): void {
  }

}
