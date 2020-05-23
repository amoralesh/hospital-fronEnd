
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexComponent } from './componentes/paginas/index/index.component';
import { PacienteComponent } from './componentes/objetos/paciente/paciente.component';
import { RegistroComponent } from './componentes/objetos/paciente/registro/registro.component';
import { ListaComponent } from './componentes/objetos/paciente/lista/lista.component';


const routes: Routes = [
  { path:'inicio', component: IndexComponent },
  { path:'paciente', component: PacienteComponent},
  { path:'paciente/nuevo', component: RegistroComponent},
  { path:'paciente/editar/:id', component: RegistroComponent},
  { path:'paciente/eliminar/:id', component: RegistroComponent},
  { path:'paciente/lista', component: ListaComponent},
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
