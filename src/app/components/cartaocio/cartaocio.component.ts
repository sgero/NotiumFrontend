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
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {AuthService} from "../../services/auth.service";
import {UsuarioService} from "../../services/usuario.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

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
    MatRowDef,
  ],
  standalone: true
})
export class CartaocioComponent  implements OnInit {

  displayedColumns: string[] = ['nombre', 'precio', 'formato'];
  dataSourceProductos: MatTableDataSource<Producto> = new MatTableDataSource<Producto>();
  @ViewChild('productosPaginator') productosPaginator!: MatPaginator;
  @ViewChild('productosSort') productosSort!: MatSort;
  @ViewChild(IonModal) modal!: IonModal;
  producto = {nombre: '',tipoCategoria: '',username: ''}
  token = {token: ''}
  productos: Producto[] = [];
  newProducto: Producto = new Producto();
  newProductoFormato: ProductoFormato = new ProductoFormato();
  constructor(private route:ActivatedRoute,
              private cartaOcioService: CartaOcioService,
              private authService: AuthService,
              private usuarioService: UsuarioService) { }


  ngOnInit() {
    this.getProductos()
    this.dataSourceProductos.paginator = this.productosPaginator;
    this.dataSourceProductos.sort = this.productosSort;
  }

  addProducto(producto: Producto) {
    const token = this.getToken();
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
      }
  }

  resetForm() {
    this.newProducto = new Producto();
    this.newProductoFormato = new ProductoFormato();
  }

  getToken(): string {
    // Implementa la lógica para obtener el token
    this.usuarioService.getUsuarioToken().subscribe(usuario => {
      const token = localStorage.getItem('token');})
    return localStorage.getItem('token') || '';
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

  private getProductos() {
    const token = this.getToken();
    this.cartaOcioService.listarProductos(token).subscribe({
      next: value => {
        this.productos = value as Producto[];
        console.log('Productos recibidos:', this.productos);
        this.dataSourceProductos = new MatTableDataSource(this.productos);
        this.dataSourceProductos.paginator = this.productosPaginator;
        this.dataSourceProductos.sort = this.productosSort;
      },
      error: (error) => {
        console.error('Error al listar productos', error);
      }
    });
  }

  // private getProductos() {
  //   const token = this.getToken();
  //   this.cartaOcioService.listarProductos(token).subscribe({
  //     next: (productos: Producto[]) => {
  //       this.productos = productos.map(producto => ({
  //         ...producto,
  //         precio: producto.formatoDTO ? producto.formatoDTO.precio : null,
  //         formatoDTO: producto.formatoDTO ? producto.formatoDTO.nombre : null // assuming formatoDTO has a name property
  //       }));
  //       this.dataSourceProductos.data = this.productos;
  //     },
  //     error: (error) => {
  //       console.error('Error al listar productos', error);
  //     }
  //   });
  // }

}
