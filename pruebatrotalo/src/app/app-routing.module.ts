import { IncidentesComponent } from './components/incidentes/incidentes.component';
import { AuthGuardService } from './guards/auth.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NoAuthGuardService } from './guards/noauth.guard';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'', component:LoginComponent, canActivate:[NoAuthGuardService]},
  { path:'clientes', component:ClientesComponent, canActivate:[AuthGuardService]},
  { path:'incidentes', component:IncidentesComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
