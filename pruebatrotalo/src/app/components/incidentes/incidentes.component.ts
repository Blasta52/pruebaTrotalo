import { IncidentesService } from './../../services/incidentes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes';

@Component({
  selector: 'app-incidentes',
  templateUrl: './incidentes.component.html',
  styleUrls: ['./incidentes.component.css']
})
export class IncidentesComponent implements OnInit {
  public incidentes : any = [];
  public detalle:any = {};
  public form:FormGroup;
  public enviado: Boolean = false;
  public isLoading: Boolean = false;
  public err:string = '';
  public success:string = '';
  public clientes : any = [];

  constructor(private service:IncidentesService, private cservice:ClientesService) { 
    this.form = new FormGroup({
      incidente: new FormControl("", [Validators.required]),
      id_cliente: new FormControl("", [Validators.required])
    });
   }

  ngOnInit() {
    this.getClientes();
    this.getIncidentes();
  }

  getClientes(){
    this.cservice.getClientes()
    .subscribe(response => {
      this.clientes = response;
    });
  }

  getIncidentes(){
    this.service.getIncidentes()
    .subscribe(response => {
      this.incidentes = response;
    });
  }

  setDetalle(incidente){
    this.detalle = incidente;
  }

  createIncidente(){
    this.enviado = true;
    this.err = '';
    this.success = '';
    
    if(this.form.status == 'VALID')
    { 
      var formData = new FormData();
      formData.append("id_cliente", this.form.value["id_cliente"]);
      formData.append("incidente", this.form.value["incidente"]);

      this.isLoading = true;
      this.service.createIncidente(formData)
      .subscribe((response) => {
        this.isLoading = false;
        this.success = response['message'];
        setTimeout(function(){
          location.reload();
        },1500);
      },
      (err) => {
        this.isLoading = false;
        if(err.status == 422){
          this.err = err.error.message;
        }
        else {
          this.err = 'Hubo un error por favor intente de nuevo';
        }
      });
    } 
  }


}
