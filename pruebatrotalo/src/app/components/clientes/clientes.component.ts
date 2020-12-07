import { ClientesService } from './../../services/clientes';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes : any = [];
  public form:FormGroup;
  public formEdit:FormGroup;
  public enviado: Boolean = false;
  public isLoading: Boolean = false;
  public err:string = '';
  public success:string = '';
  public deleteId:number = 0;

  constructor(private service:ClientesService) { 

    this.form = new FormGroup({
      cliente: new FormControl("", [Validators.required])
    });

    this.formEdit = new FormGroup({
      cliente: new FormControl("", [Validators.required]),
      id_cliente: new FormControl("", [Validators.required])
    });

  }

  ngOnInit() {
    this.getClientes();
  }

  setDeleteClient(id_cliente){
    this.deleteId = id_cliente;
  }

  setFormEdit(cliente){
    this.err = '';
    this.success = '';
    this.formEdit = new FormGroup({
      cliente: new FormControl(cliente.cliente, [Validators.required]),
      id_cliente: new FormControl(cliente.id_cliente, [Validators.required])
    });
  }

  getClientes(){
    this.service.getClientes()
    .subscribe(response => {
      this.clientes = response;
    });
  }

  createClient(){
    this.enviado = true;
    this.err = '';
    this.success = '';
    
    if(this.form.status == 'VALID')
    { 
      var formData = new FormData();
      formData.append("cliente", this.form.value["cliente"]);

      this.isLoading = true;
      this.service.createClient(formData)
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


  updateClient(){
    this.enviado = true;
    this.err = '';
    this.success = '';
    
    if(this.formEdit.status == 'VALID')
    { 
      var formData = new FormData();
      formData.append("cliente", this.formEdit.value["cliente"]);
      formData.append("id_cliente", this.formEdit.value["id_cliente"]);

      this.isLoading = true;
      this.service.updateClient(formData)
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

  deleteClient(){
    this.err = '';
    this.success = '';
      var formData = new FormData();
      formData.append("id_cliente", this.deleteId.toString());

      this.isLoading = true;
      this.service.deleteClient(formData)
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
          setTimeout(() => {
            this.err = '';
          },3000);
        }
        else {
          this.err = 'Hubo un error por favor intente de nuevo';
        }
      });
    } 

}
