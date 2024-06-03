import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {CartaOcio} from "../../models/CartaOcio";

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
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatButton,
  ],
  standalone: true
})
export class CartaocioComponent  implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'precio', 'formato', 'opciones'];
  dataSourceProductos: MatTableDataSource<ProductoFormato> = new MatTableDataSource<ProductoFormato>();
  @ViewChild(MatPaginator) productosPaginator!: MatPaginator;
  @ViewChild(MatSort) productosSort!: MatSort;
  @ViewChild(IonModal) modal!: IonModal;
  producto = {nombre: '',tipoCategoria: '',username: ''}
  formato = {productoDTO: '',precio: '',formatoDTO: ''}
  token = {token: ''}
  productos: Producto[] = [];
  newProducto: Producto = new Producto();
  formatos: ProductoFormato[] = [];
  newProductoFormato: ProductoFormato = new ProductoFormato();
  constructor(private route:ActivatedRoute,
              private cartaOcioService: CartaOcioService,
              private authService: AuthService,
              private usuarioService: UsuarioService) { }


  ngOnInit() {
    // this.getProductos()
    this.getFormatos()
  }

  ngAfterViewInit() {
    this.dataSourceProductos.paginator = this.productosPaginator;
    this.dataSourceProductos.sort = this.productosSort;

    this.dataSourceProductos.filterPredicate = (data: ProductoFormato, filter: string) => {
      return data.productoDTO!.nombre!.toLowerCase().includes(filter);
    };
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
        // this.dataSourceProductos = new MatTableDataSource(this.productos);
        // this.dataSourceProductos.paginator = this.productosPaginator;
        // this.dataSourceProductos.sort = this.productosSort;
      },
      error: (error) => {
        console.error('Error al listar productos', error);
      }
    });
  }

  private getFormatos() {
    const token = this.getToken();
    this.cartaOcioService.listarFormatos(token).subscribe({
      next: value => {
        this.formatos = value as ProductoFormato[];
        console.log('Formatos recibidos:', this.formatos);
        this.formatos.sort((a, b) => a!.productoDTO!.nombre!.localeCompare(b!.productoDTO!.nombre!));
        this.dataSourceProductos.data = this.formatos;
        this.dataSourceProductos.paginator = this.productosPaginator;
        this.dataSourceProductos.sort = this.productosSort;
      },
      error: (error) => {
        console.error('Error al listar productos', error);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProductos.paginator) {
      this.dataSourceProductos.paginator.firstPage();
    }
  }

  edit(id) {

  }

  deleteProductoFormato(id) {

  }
}
