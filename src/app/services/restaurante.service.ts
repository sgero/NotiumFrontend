import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private apiUrl = 'http://127.0.0.1:8000';
  constructor(private  http:HttpClient) { }

}
