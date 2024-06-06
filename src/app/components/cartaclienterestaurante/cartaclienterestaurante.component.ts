import {Component, Input, OnInit} from '@angular/core';
import {CartarestauranteService} from "../../services/cartarestaurante.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-cartaclienterestaurante',
  templateUrl: './cartaclienterestaurante.component.html',
  styleUrls: ['./cartaclienterestaurante.component.scss'],
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class CartaclienterestauranteComponent  implements OnInit {


  token = {token: ''}
  productos: any;
  entrante: boolean = false;
  guiso: boolean = false;
  frito: boolean = false;
  revuelto: boolean = false;
  carne: boolean = false;
  pescado: boolean = false;
  postre: boolean = false;
  vino: boolean = false;
  refresco: boolean = false;
  agua: boolean = false;
  cerveza: boolean = false;
  bebidaAlcoholica: boolean = false;
  coctel: boolean = false;
  otros: boolean = false;
  @Input() restaurante!: any;

  constructor(private cartarestauranteService : CartarestauranteService, private router : Router) { }

  ngOnInit() {
    this.token.token = this.restaurante.userDTO.username;
    this.ocultarPrecio();
  }
  ocultarPrecio(){
    this.cartarestauranteService.listarProducto(this.token).subscribe(data =>{
      data.forEach(item =>{
        if (item.producto?.tipoCategoria === 'ENTRANTE' && item.formatos?.length !== 0){
          this.entrante = true;
        }
        if (item.producto?.tipoCategoria === 'GUISO' && item.formatos?.length !== 0){
          this.guiso = true;
        }
        if (item.producto?.tipoCategoria === 'FRITO' && item.formatos?.length !== 0){
          this.frito = true;
        }
        if (item.producto?.tipoCategoria === 'REVUELTO' && item.formatos?.length !== 0){
          this.revuelto = true;
        }
        if (item.producto?.tipoCategoria === 'CARNE' && item.formatos?.length !== 0){
          this.carne = true;
        }
        if (item.producto?.tipoCategoria === 'PESCADO' && item.formatos?.length !== 0){
          this.pescado = true;
        }
        if (item.producto?.tipoCategoria === 'POSTRE' && item.formatos?.length !== 0){
          this.postre = true;
        }
        if (item.producto?.tipoCategoria === 'VINO' && item.formatos?.length !== 0){
          this.vino = true;
        }
        if (item.producto?.tipoCategoria === 'REFRESCO' && item.formatos?.length !== 0){
          this.refresco = true;
        }
        if (item.producto?.tipoCategoria === 'GUISO' && item.formatos?.length !== 0){
          this.guiso = true;
        }
        if (item.producto?.tipoCategoria === 'AGUA' && item.formatos?.length !== 0){
          this.agua = true;
        }
        if (item.producto?.tipoCategoria === 'CERVEZA' && item.formatos?.length !== 0){
          this.cerveza = true;
        }
        if (item.producto?.tipoCategoria === 'BEBIDA_ALCOHOLICA' && item.formatos?.length !== 0){
          this.bebidaAlcoholica = true;
        }
        if (item.producto?.tipoCategoria === 'COCTEL' && item.formatos?.length !== 0){
          this.coctel = true;
        }
        if (item.producto?.tipoCategoria === 'OTROS' && item.formatos?.length !== 0){
          this.otros = true;
        }
      });
      this.productos = data;
    })
  }

}
