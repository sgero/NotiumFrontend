import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CartarestauranteService} from "../../services/cartarestaurante.service";
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cartarestaurante',
  templateUrl: './cartarestaurante.component.html',
  styleUrls: ['./cartarestaurante.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
    NgForOf,
    FormsModule
  ],
  standalone: true
})
export class CartarestauranteComponent  implements OnInit {

  producto = {nombre: '',tipoCategoria: '',username: ''}
  token = {token: ''}
  productos: any;
  constructor(private cartarestauranteService : CartarestauranteService, private router : Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.token = token;
    }
    this.cartarestauranteService.listarProducto(this.token).subscribe(data =>{
      console.log(data);
      this.productos = data;
    })
  }

  crearProducto(){
      this.cartarestauranteService.crearProducto(this.producto).subscribe(data =>{
        console.log(data);

      })
  }

}
