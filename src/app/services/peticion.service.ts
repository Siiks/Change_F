import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  private apiUrl = 'http://localhost:8000/api/peticiones';

  token: any;
  constructor(private http: HttpClient, public router: Router) {
    this.token = '';
  }

  index() {
    return this.http.get<any[]>(this.apiUrl + '/listado');
  }

  crear(peticion: any) {

    const token = localStorage.getItem('token');
    const url = 'http://localhost:8000/api/peticiones/add';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(url, peticion, httpOptions);
  }

}
