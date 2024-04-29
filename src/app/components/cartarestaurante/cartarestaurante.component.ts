import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CartarestauranteService} from "../../services/cartarestaurante.service";

@Component({
  selector: 'app-cartarestaurante',
  templateUrl: './cartarestaurante.component.html',
  styleUrls: ['./cartarestaurante.component.scss'],
})
export class CartarestauranteComponent  implements OnInit {

  producto = {nombre: '',tipoCategoria: '',idCartaRestaurante: +''}
  token = {token: ''}
  constructor(private cartarestauranteService : CartarestauranteService, private router : Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token.token = token;
    }
    this.cartarestauranteService.listarProducto(this.token).subscribe(data =>{
      console.log(data);
    })
  }

  crearProducto(){
      this.cartarestauranteService.crearProducto(this.producto).subscribe(data =>{
        console.log(data);
      })
  }

}
