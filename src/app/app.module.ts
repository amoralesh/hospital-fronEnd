import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    IndexComponent,
    RegistroComponent,
    MenuComponent,
    CabeceraComponent,
    DireccionComponent,
    EntidadfederativaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule                        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
