import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    /* Define variables */
    private httpOptions;

    constructor(private http:HttpClient) { 
        this.httpOptions = {
            headers: new HttpHeaders({
                "Authorization": localStorage.getItem("token")
            })
          };
    }

    getClientes()
    {   
        return this.http.get(`${environment.apiUrl}/clientes/getClientes`, this.httpOptions)
        .pipe( map( data => data )
        );
    }

    createClient(data){
      return this.http.post(`${environment.apiUrl}/clientes/nuevoCliente`, data, this.httpOptions)
      .pipe( map( data => data )
      );
    }

    updateClient(data){
        return this.http.post(`${environment.apiUrl}/clientes/actualizarCliente`, data, this.httpOptions)
        .pipe( map( data => data )
        );
      }

      deleteClient(data){
        return this.http.post(`${environment.apiUrl}/clientes/eliminarCliente`, data, this.httpOptions)
        .pipe( map( data => data )
        );
      }
}

