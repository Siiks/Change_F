import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get<any[]>(this.apiUrl + 'listado');
  }

  enviarFormulario(
    titulo: string,
    descripcion: string,
    destinatario: string,
    category_id: string
  ) {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8000/api/peticiones/add';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    const body = {
      titulo,
      descripcion,
      destinatario,
      category_id,
    };

    console.log(body);
    return this.http.post<any>(url, body, httpOptions);
  }
}
