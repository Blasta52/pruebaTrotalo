import { NoAuthGuardService } from './guards/noauth.guard';
import { AuthGuardService } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule } from "@angular/common/http";
import { ClientesComponent } from './components/clientes/clientes.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IncidentesComponent } from './components/incidentes/incidentes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    ClientesComponent,
    HeaderComponent,
    FooterComponent,
    IncidentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService,NoAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
