import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CartarestauranteService} from "../../services/cartarestaurante.service";
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cartarestaurante',
  templateUrl: './cartarestaurante.component.html',
  styleUrls: ['./cartarestaurante.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class CartarestauranteComponent  implements OnInit {

  producto = {nombre: '',tipoCategoria: '',username: ''}
  token = {token: ''}
  productos: any;
  productoF = {id: +''}
  FormatoP = {id: +''}
  productoFormato = {precio: +'', productoDTO: this.productoF, formatoDTO: this.FormatoP}
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
    const token = localStorage.getItem('token');
    if (token) {
      this.producto.username = token;
    }
      this.cartarestauranteService.crearProducto(this.producto).subscribe(data =>{
        console.log(data);

      })
  }

  crearProductoFormato(idp:number,idf:number){
    this.productoF.id = idp;
    this.FormatoP.id = idf;
    this.cartarestauranteService.crearProductoFormato(this.productoFormato).subscribe(data =>{
      console.log(data)
    })
  }

}
