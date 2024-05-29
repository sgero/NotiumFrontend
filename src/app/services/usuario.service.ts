import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService{

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) { }

  autorizarPeticion(){
    const localToken = localStorage.getItem('token');

    const headers = new HttpHeaders({
      ContentType: 'application/json',
      Authorization : `Bearer ${localToken}`
    });

    return {headers:headers}
  }

  getUsuarioToken()  {
    const header = this.autorizarPeticion();
    return this.http.get<Usuario>(`${this.apiUrl}/auth/getusuario`, header);
  }


  getUsuarios() :Observable<JSON> {

    return this.http.get<JSON>(`${this.apiUrl}/usuario`);

  }

  registrarUsuario(data: Usuario) {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  loginUsuario(data: Usuario) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  logoutUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logout`);
  }

  // ADMINS desde panel de control (Pestaña de administración)
  getUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario`);
  }

  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${id}`);
  }

  updateUsuario(usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuario`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuario/${id}`);
  }

  getUsuarioByToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarioByToken`);
  }


}
