import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './componentes/paginas/index/index.component';
import { PacienteComponent } from './componentes/objetos/paciente/paciente.component';
import { RegistroComponent } from './componentes/objetos/paciente/registro/registro.component';


const routes: Routes = [
  { path:'inicio', component: IndexComponent },
  { path:'paciente', component: PacienteComponent},
  { path:'paciente/registro', component: RegistroComponent},
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
