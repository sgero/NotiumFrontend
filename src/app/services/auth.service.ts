import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private userRole: string | null = null;
  private username: string | null = null;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.userRole = null;

    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    return this.isLoggedIn;
  }

  getUserRole(): string | null {
    this.userRole = localStorage.getItem('userRole');
    return this.userRole;
  }
  getUsername(): string {
    this.username = localStorage.getItem('username');
    return localStorage.getItem('username') || '';
  }

}
