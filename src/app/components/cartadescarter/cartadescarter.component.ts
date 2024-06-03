import { Component, OnInit } from '@angular/core';
import {CartarestauranteService} from "../../services/cartarestaurante.service";
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-cartadescarter',
  templateUrl: './cartadescarter.component.html',
  styleUrls: ['./cartadescarter.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class CartadescarterComponent  implements OnInit {


  producto = {nombre: '',tipoCategoria: '',username: ''}
  token = {token: ''}
  productos: any;
  productoF = {id: +''}
  FormatoP = {id: +''}
  productoFormato = {precio: +'', productoDTO: this.productoF, formatoDTO: this.FormatoP}
  precioMenu: any;
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
  bajaP = {id: +''};
  eliminado = {id: +''};


  constructor(private cartarestauranteService : CartarestauranteService, private router : Router, private usuarioservice: UsuarioService) { }

  ngOnInit() {
    if (localStorage.length === 0){
      this.router.navigate(['/notium']);
    }
    this.usuarioservice.getUsuarioToken().subscribe(data=>{
      this.token.token = data.username;
      const rol = data.rol;
      if (rol?.toString() !== "RESTAURANTE"){
        this.router.navigate(['/notium/restaurante']);
      }
      this.cartarestauranteService.listarProductoDescarte(this.token).subscribe(data =>{
        console.log(data);
        data.forEach(item =>{
          if (item.producto?.tipoCategoria === 'ENTRANTE'){
            this.entrante = true;
          }
          if (item.producto?.tipoCategoria === 'GUISO'){
            this.guiso = true;
          }
          if (item.producto?.tipoCategoria === 'FRITO'){
            this.frito = true;
          }
          if (item.producto?.tipoCategoria === 'REVUELTO'){
            this.revuelto = true;
          }
          if (item.producto?.tipoCategoria === 'CARNE'){
            this.carne = true;
          }
          if (item.producto?.tipoCategoria === 'PESCADO'){
            this.pescado = true;
          }
          if (item.producto?.tipoCategoria === 'POSTRE'){
            this.postre = true;
          }
          if (item.producto?.tipoCategoria === 'VINO'){
            this.vino = true;
          }
          if (item.producto?.tipoCategoria === 'REFRESCO'){
            this.refresco = true;
          }
          if (item.producto?.tipoCategoria === 'GUISO'){
            this.guiso = true;
          }
          if (item.producto?.tipoCategoria === 'AGUA'){
            this.agua = true;
          }
          if (item.producto?.tipoCategoria === 'CERVEZA'){
            this.cerveza = true;
          }
          if (item.producto?.tipoCategoria === 'BEBIDA_ALCOHOLICA'){
            this.bebidaAlcoholica = true;
          }
          if (item.producto?.tipoCategoria === 'COCTEL'){
            this.coctel = true;
          }
          if (item.producto?.tipoCategoria === 'OTROS'){
            this.otros = true;
          }
        });
        this.productos = data;
      })
    })
  }


  crearProductoFormato(idp:number,idf:number){
    this.productoF.id = idp;
    this.FormatoP.id = idf;
    this.cartarestauranteService.crearProductoFormato(this.productoFormato).subscribe(data =>{
      console.log(data)
    })
  }
  mostrarPrecio(id: string){
    if (this.precioMenu){this.precioMenu.style.display = 'none';}
    this.precioMenu = document.getElementById(id);
    this.precioMenu.style.display = 'flex';
  }
  ocultarPrecio(){
    this.cartarestauranteService.listarProductoDescarte(this.token).subscribe(data =>{
      data.forEach(item =>{
        if (item.producto?.tipoCategoria === 'ENTRANTE'){
          this.entrante = true;
        }
        if (item.producto?.tipoCategoria === 'GUISO'){
          this.guiso = true;
        }
        if (item.producto?.tipoCategoria === 'FRITO'){
          this.frito = true;
        }
        if (item.producto?.tipoCategoria === 'REVUELTO'){
          this.revuelto = true;
        }
        if (item.producto?.tipoCategoria === 'CARNE'){
          this.carne = true;
        }
        if (item.producto?.tipoCategoria === 'PESCADO'){
          this.pescado = true;
        }
        if (item.producto?.tipoCategoria === 'POSTRE'){
          this.postre = true;
        }
        if (item.producto?.tipoCategoria === 'VINO'){
          this.vino = true;
        }
        if (item.producto?.tipoCategoria === 'REFRESCO'){
          this.refresco = true;
        }
        if (item.producto?.tipoCategoria === 'GUISO'){
          this.guiso = true;
        }
        if (item.producto?.tipoCategoria === 'AGUA'){
          this.agua = true;
        }
        if (item.producto?.tipoCategoria === 'CERVEZA'){
          this.cerveza = true;
        }
        if (item.producto?.tipoCategoria === 'BEBIDA_ALCOHOLICA'){
          this.bebidaAlcoholica = true;
        }
        if (item.producto?.tipoCategoria === 'COCTEL'){
          this.coctel = true;
        }
        if (item.producto?.tipoCategoria === 'OTROS'){
          this.otros = true;
        }
      });
      this.productos = data;
    })
    //this.precioMenu.style.display = 'none';
  }


  darBajaProducto(id: number){
    this.bajaP.id = id;
    this.cartarestauranteService.bajaProducto(this.bajaP).subscribe(data =>{
      console.log(data);
      this.ocultarPrecio();
    })
  }

  eliminarProducto(id: number){
    this.eliminado.id = id;
    this.cartarestauranteService.eliminarProducto(this.eliminado).subscribe(data =>{
      console.log(data);
      this.ocultarPrecio();
    })
  }

}
