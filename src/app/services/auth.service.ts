import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private userRole: string | null = null;
  isAdmin = false;
  isClient = false;
  isRestaurant = false;
  isOcioNocturno = false;
  isRpp = false;


  constructor(private http: HttpClient) { }

  login(username: string | undefined, password: string | undefined): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string, role: string }>('/api/auth/login', { username, password })
      .pipe(
        tap(response => {
          this.isLoggedIn = true;
          this.userRole = response.role;
          // Almacenar el token JWT en el almacenamiento local si es necesario
          localStorage.setItem('token', response.token); // Almacena el token JWT en localStorage
          localStorage.setItem('userRole', response.role); // Almacena el rol del usuario en localStorage



        })
      );
  }

  logout() {
    this.isLoggedIn = false;
    this.userRole = null;
    // Eeliminar el token JWT del almacenamiento local si es necesario
    localStorage.removeItem('token'); // Elimina el token JWT de localStorage
    localStorage.removeItem('userRole'); // Elimina el rol del usuario de localStorage

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
    return localStorage.getItem('username') || '';
  }
}
