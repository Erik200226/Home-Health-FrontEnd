import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Credentials } from '../model/credentials';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';


const baseUrl = environment.base;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${baseUrl}/authenticate`;

  constructor(private http: HttpClient) {}

  login(creds: Credentials) {
    return this.http.post(this.url, creds, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization');
        if (token) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('token', token);
          }
          return response.body;
        } else {
          throw new Error('Token not found in the response');
        }
      }));
  }

  getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getPacienteId() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token.replace('Bearer ', ''));
        return decodedToken.pacienteId;
      }
    }
    return null;
  }

  getRoles() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : null;
    }
    return null;
  }

  getMedicoId() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('medicoId');
    }
    return null;
  }
  getUsername() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = jwtDecode(token.replace('Bearer ', ''));
        return decodedToken.usuario;
      }
    }
    return null;
  }

  closeSession() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
    }
  }
}
