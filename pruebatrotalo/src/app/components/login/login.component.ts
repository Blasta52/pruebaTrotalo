import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form:FormGroup;
  public enviado: Boolean = false;
  public isLoading: Boolean = false;
  public err:string = '';
  public success:string = '';
  
  constructor(private service:AuthenticationService) {

    this.form = new FormGroup({
      contratista: new FormControl("", [Validators.required, Validators.pattern(/^[0-9a-zA-ZñÑ]*$/)])
    });

   }

  ngOnInit() {
  }
  

  login(){
    this.enviado = true;
    this.err = '';
    this.success = '';
    
    if(this.form.status == 'VALID')
    { 
      var formData = new FormData();
      formData.append("contratista", this.form.value["contratista"]);

      this.isLoading = true;
      this.service.login(formData)
      .subscribe((response) => {
        this.isLoading = false;
        localStorage.setItem("token",response['token']);
        localStorage.setItem("contratista",response['contratista']);
        window.location.href = "/clientes";
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

  registrarse(){
    this.enviado = true;
    this.err = '';
    this.success = '';
    
    if(this.form.status == 'VALID')
    { 
      var formData = new FormData();
      formData.append("contratista", this.form.value["contratista"]);

      this.isLoading = true;
      this.service.registration(formData)
      .subscribe((response) => {
        this.isLoading = false;
        this.success = response['message'];
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
