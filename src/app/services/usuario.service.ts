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
    return this.http.get<JSON>(`${this.apiUrl}/users/listar`);
  }

  loginUsuario(data: Usuario) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  validaUsernameEmailExistentes(user: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/users/validar`, user);
  }

  traerPerfil(usuario: Usuario){
    return this.http.post<any>(`${this.apiUrl}/users/perfil`, usuario);
  }

  eliminarCuenta(usuario: Usuario){
    return this.http.post<any>(`${this.apiUrl}/users/eliminar`, usuario);
  }

  activarCuenta(usuario: Usuario){
    return this.http.post<any>(`${this.apiUrl}/users/activar`, usuario);
  }

}
