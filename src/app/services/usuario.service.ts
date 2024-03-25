import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getUsuarios() :Observable<JSON> {

    return this.http.get<JSON>(`${this.apiUrl}/usuario`);

  }

}
