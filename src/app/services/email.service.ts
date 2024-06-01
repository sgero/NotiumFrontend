import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/email/send'; // Asegúrate de que esta URL coincide con la de tu servidor backend

  constructor(private http: HttpClient) { }

  // sendEmail(to: string, subject: string, text: string): Observable<any> {
  //   return this.http.post(this.apiUrl, { to, subject, text });
  // }


  sendEmail(to: string, subject: string, body: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajusta según el esquema de autenticación de tu backend
    });

    const emailData = { to, subject, body };
    return this.http.post<any>(this.apiUrl, emailData, { headers });
  }
}
