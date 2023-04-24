import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  private apiUrl = 'http://localhost:8000/api/peticiones';
  peticiones: any[] = [];
  token: any;
  form!: FormGroup;
  selectedImage!: any;

  constructor(private http: HttpClient, public router: Router, private formBuilder: FormBuilder,) {
    this.token = ''
    this.index()
  }

  index() {
    return this.http.get<any[]>(this.apiUrl + '/listado');
  }

  rellenarPeticiones(respuesta: any) {
    this.peticiones = respuesta.data;
  }

  crear(peticion: any) {
    const token = localStorage.getItem('token');
    const url = this.apiUrl + '/add';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    httpOptions.headers.append('Content-Type', 'multipart/form-data')
    httpOptions.headers.append('Accept', 'application/json')

    return this.http.post<any>(url, peticion, httpOptions);
  }

  getPeticionesByIdUsuario(idUsuario: number) {
    const token = localStorage.getItem('token');
    const url = this.apiUrl + '/mispeticiones/' + idUsuario;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<any[]>(url, httpOptions)
  }

  deletePeticion(idPeticion: number) {
    const token = localStorage.getItem('token');
    const url = this.apiUrl + '/delete/' + idPeticion;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete(url, httpOptions)
  }

  getPeticionById(id: number) {
    const token = localStorage.getItem('token');
    const url = this.apiUrl + '/peticion/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<any>(url, httpOptions)
  }

  editPeticion(peticion: any, idPeticion: number) {
    const token = localStorage.getItem('token');
    const url = this.apiUrl + '/edit/' + idPeticion;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    httpOptions.headers.append('Content-Type', 'multipart/form-data')
    httpOptions.headers.append('Accept', 'application/json')

    return this.http.post<any>(url, peticion, httpOptions);
  }
}
