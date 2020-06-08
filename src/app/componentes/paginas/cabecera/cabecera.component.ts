import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  ocultar=true;
  constructor(public autenticacionServicio:AutenticacionService){

  }

  ngOnInit(): void {
  }

  cambiar(){
    this.ocultar = !this.ocultar;
  }

}
