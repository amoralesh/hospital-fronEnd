import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Menu desplegable
import { AccordionModule } from 'primeng/accordion'; 

import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
//Peticiones http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//para poder trabajar formularios
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/paginas/index/index.component';
import { RegistroComponent } from './componentes/objetos/paciente/registro/registro.component';
import { MenuComponent } from './componentes/paginas/menu/menu.component';
import { CabeceraComponent } from './componentes/paginas/cabecera/cabecera.component';
import { EntidadfederativaComponent } from './componentes/objetos/direccion/entidadfederativa/entidadfederativa.component';
//Interface (presentación)
import { MaterialModule } from './material/material.module';
import { ListaComponent } from './componentes/objetos/paciente/lista/lista.component';
//Spiner que se muestra al cargar algo
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
//Alertas personalizadas
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
//Graficas
import { MorrisJsModule } from 'angular-morris-js';

//graficas
import { ChartsModule } from 'ng2-charts';
//Interface (presentación)
import { PrimerNGModule } from './primerng/primerng.module';
import { LoginComponent } from './componentes/paginas/login/login.component';
//Capturar Errores
import { ErroresService } from './servicios/errores.service';
//Trabajar con el Token desde el backend
import { JwtModule } from "@auth0/angular-jwt";

import { MessageService } from 'primeng/api';
import { Error403Component } from './componentes/paginas/error403/error403.component';

export function tokenGetter(){
  let tk = JSON.parse(sessionStorage.getItem('access_token'));
  let token = tk != null ? tk.acces_token : '';
  //console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RegistroComponent,
    MenuComponent,
    CabeceraComponent,
    EntidadfederativaComponent,
    ListaComponent,
    LoginComponent,
    Error403Component,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimerNGModule,
    NgxSpinnerModule,
    RouterModule,
    SweetAlert2Module,
    MorrisJsModule,
    ChartsModule,
    BrowserAnimationsModule,
    AccordionModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:8090"],
        blacklistedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErroresService,
    multi: true
  },MessageService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
