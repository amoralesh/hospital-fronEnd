import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Observable } from 'rxjs/Observable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacienteComponent } from './componentes/objetos/paciente/paciente.component';
import { IndexComponent } from './componentes/paginas/index/index.component';
import { RegistroComponent } from './componentes/objetos/paciente/registro/registro.component';
import { MenuComponent } from './componentes/paginas/menu/menu.component';
import { CabeceraComponent } from './componentes/paginas/cabecera/cabecera.component';
import { DireccionComponent } from './componentes/objetos/direccion/direccion/direccion.component';
import { EntidadfederativaComponent } from './componentes/objetos/direccion/entidadfederativa/entidadfederativa.component';
import { MaterialModule } from './material/material.module';
import { ListaComponent } from './componentes/objetos/paciente/lista/lista.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MorrisJsModule } from 'angular-morris-js';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    IndexComponent,
    RegistroComponent,
    MenuComponent,
    CabeceraComponent,
    DireccionComponent,
    EntidadfederativaComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSpinnerModule,
    RouterModule,
    SweetAlert2Module,
    MorrisJsModule,
    ChartsModule            
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
