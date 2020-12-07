import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {

    /* Define variables */
    private httpOptions;

    constructor(private http:HttpClient) { 
        this.httpOptions = {
            headers: new HttpHeaders({
                "Authorization": localStorage.getItem("token")
            })
          };
    }

    getIncidentes()
    {   
        return this.http.get(`${environment.apiUrl}/incidentes/getIncidentes`, this.httpOptions)
        .pipe( map( data => data )
        );
    }

    createIncidente(data){
      return this.http.post(`${environment.apiUrl}/incidentes/nuevoIncidente`, data, this.httpOptions)
      .pipe( map( data => data )
      );
    }

}

