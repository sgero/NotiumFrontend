import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllClases() {

    return this.http.get<any>(`${this.apiUrl}/clase/getAll`);

  }
}
