import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  ocultar=true;
  constructor() { }

  ngOnInit(): void {
  }

  cambiar(){
    this.ocultar = !this.ocultar;
  }

}
