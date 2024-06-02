import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators';
import {Usuario} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private userRole: string | null = null;
  private username: string | null = null;

  isAdmin = false;
  isClient = false;
  isRestaurant = false;
  isOcioNocturno = false;
  isRpp = false;
  private currentUser: Usuario | null = null;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();



  constructor(private http: HttpClient) { }

  login(username: string | undefined, password: string | undefined): Observable<{ token: string; role: string; username: string }> {
    return this.http.post<{ token: string, role: string, username: string }>('/api/auth/login', { username, password })
      .pipe(
        tap(response => {

          // Almacenar el token JWT en el almacenamiento local si es necesario
          localStorage.setItem('token', response.token); // Almacena el token JWT en localStorage
          localStorage.setItem('userRole', response.role); // Almacena el rol del usuario en localStorage
          localStorage.setItem('username', response.username);

          this.isLoggedIn = true;
          this.userRole = response.role;
          this.currentUser = { username: response.username };
          // Actualizar el BehaviorSubject para reflejar el estado de autenticación actual
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout() {

    // Eeliminar el token JWT del almacenamiento local si es necesario
    localStorage.removeItem('token'); // Elimina el token JWT de localStorage
    localStorage.removeItem('userRole'); // Elimina el rol del usuario de localStorage
    this.isLoggedIn = false;
    this.userRole = null;

    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    // Comprueba si hay un token en localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    return this.isLoggedIn;
  }

  getUserRole(): string | null {
    // Recupera el rol del usuario de localStorage
    this.userRole = localStorage.getItem('userRole');
    return this.userRole;
  }
  getUsername(): string {
    // Obtener el nombre de usuario desde el almacenamiento local, una cookie, o cualquier otra fuente
    this.username = localStorage.getItem('username');

    return localStorage.getItem('username') || '';
  }


  getCurrentUser(): Observable<String | null> {
    // Simulamos una llamada asíncrona para obtener el usuario actual
    const username = localStorage.getItem('username');
    return of(username);
  }


}
