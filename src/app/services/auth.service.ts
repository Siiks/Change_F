import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  token: any;

  constructor(private http: HttpClient, public router: Router) {
    this.token = '';
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user).subscribe();
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        const token = response.access_token;
        this.token = token;
        localStorage.setItem('token', this.token);
        localStorage.setItem('actualUser', user.email)
      })
    ).subscribe()
  }


  logout(token: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    localStorage.removeItem('actualUser');
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, httpOptions).subscribe();
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    };
    console.log(this.http.get(`${this.apiUrl}/me`, httpOptions));
    
    return this.http.get<any>(`${this.apiUrl}/me`, httpOptions);
  }
}
