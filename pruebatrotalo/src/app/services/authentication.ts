import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    /* Define variables */
    private httpOptions = {
      headers: new HttpHeaders({
      })
    };

    constructor(private http:HttpClient) { }

    registration(data)
    {
        return this.http.post(`${environment.apiUrl}/login/registration`, data, this.httpOptions)
        .pipe( map( data => data )
        );
    }

    login(data){
      return this.http.post(`${environment.apiUrl}/login/login`, data, this.httpOptions)
      .pipe( map( data => data )
      );
    }
}

