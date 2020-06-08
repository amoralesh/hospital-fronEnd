
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { IndexComponent } from './componentes/paginas/index/index.component';
import { RegistroComponent } from './componentes/objetos/paciente/registro/registro.component';
import { ListaComponent } from './componentes/objetos/paciente/lista/lista.component';
import { LoginComponent } from './componentes/paginas/login/login.component';
import { GuardService } from './servicios/guard.service';
import { Error403Component } from './componentes/paginas/error403/error403.component';


const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'no/autorizado', component:Error403Component},
  { path:'inicio', component: IndexComponent, canActivate:[GuardService] },
  { path:'paciente/nuevo', component: RegistroComponent, canActivate:[GuardService]},
  { path:'paciente/editar/:id', component: RegistroComponent},
  { path:'paciente/eliminar/:id', component: RegistroComponent, canActivate:[GuardService]},
  { path:'paciente/lista', component: ListaComponent, canActivate:[GuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
