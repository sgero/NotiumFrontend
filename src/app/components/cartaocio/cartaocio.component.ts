import {Component, OnInit, ViewChild} from '@angular/core';
import {OverlayEventDetail} from "@ionic/core";
import {IonicModule, IonModal} from "@ionic/angular";
import {Producto} from "../../models/Producto";
import {ProductoFormato} from "../../models/ProductoFormato";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CartaOcioService} from "../../services/cartaOcio.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatTable
} from "@angular/material/table";
import {AuthService} from "../../services/auth.service";
import {UsuarioService} from "../../services/usuario.service";
import {CodigoVestimentaOcio} from "../../models/CodigoVestimentaOcio";
import {TipoCategoria} from "../../models/TipoCategoria";

@Component({
  selector: 'app-cartaocio',
  templateUrl: './cartaocio.component.html',
  styleUrls: ['./cartaocio.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
  ],
  standalone: true
})
export class CartaocioComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  producto = {nombre: '',tipoCategoria: '',username: ''}
  token = {token: ''}
  // productos: any;
  productoF = {id: +''}
  FormatoP = {id: +''}
  productoFormato = {precio: +'', productoDTO: this.productoF, formatoDTO: this.FormatoP}
  refresco: boolean = false;
  agua: boolean = false;
  cerveza: boolean = false;
  bebidaAlcoholica: boolean = false;
  coctel: boolean = false;
  productos: Producto[] = [];
  newProducto: Producto = new Producto();
  newProductoFormato: ProductoFormato = new ProductoFormato();
  constructor(private route:ActivatedRoute,
              private cartaOcioService: CartaOcioService,
              private authService: AuthService,
              private usuarioService: UsuarioService) { }

  // newProducto: Producto = new Producto();
  // newProductoFormato:  ProductoFormato = new ProductoFormato();
  ngOnInit() {

    this.getProducto()
  }

  addProducto(producto: Producto) {
    this.usuarioService.getUsuarioToken().subscribe(usuario => {
      const token = localStorage.getItem('token');
      if (token){
        this.cartaOcioService.crearProducto(producto, token).subscribe({
          next: createdProduct => {
            this.newProductoFormato.productoDTO = createdProduct;
            this.cartaOcioService.crearProductoFormato(this.newProductoFormato).subscribe({
              next: createdProductFormato => {
                if (createdProductFormato.formatoDTO) {
                  this.productos.push(createdProductFormato.formatoDTO);
                  console.log(this.newProductoFormato)
                }
                this.resetForm();
              },
              error: error => {
                console.error("Error creating product format", error);
              }
            });
          },
          error: error => {
            console.error("Error creating product", error);
          }
        });
      }})
  }

  resetForm() {
    this.newProducto = new Producto();
    this.newProductoFormato = new ProductoFormato();
  }



  onWillDismiss($event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Producto>>;
    if (ev.detail.role === 'agregar' && ev.detail.data) {
      //metodo q quieres llamar
      this.addProducto(ev.detail.data)
    }
  }

  cancelar() {
    this.modal.dismiss(null, 'cancelar')
  }

  agregar() {
    this.newProducto.username = this.authService.getUsername();
    this.modal.dismiss(this.newProducto, 'agregar')
  }

  private getProducto() {

  }
}
