import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal, LoadingController, ToastController} from "@ionic/angular";
import {Producto} from "../../models/Producto";
import {ProductoFormato} from "../../models/ProductoFormato";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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
import {MatStep, MatStepLabel} from "@angular/material/stepper";
import {Formato} from "../../models/Formato";
import {ClienteService} from "../../services/cliente.service";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {Cliente} from "../../models/Cliente";
import {CartaOcio} from "../../models/CartaOcio";
import {OcioNocturno} from "../../models/OcioNocturno";
import {Usuario} from "../../models/Usuario";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

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
    MatStep,
    MatStepLabel,
    ReactiveFormsModule,
  ],
  standalone: true
})
export class CartaocioComponent  implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'precio', 'formato', 'opciones'];
  dataSourceProductos: MatTableDataSource<ProductoFormato> = new MatTableDataSource<ProductoFormato>();
  @ViewChild(MatPaginator) productosPaginator!: MatPaginator;
  @ViewChild(MatSort) productosSort!: MatSort;
  @ViewChild(IonModal) modal!: IonModal;
  precio1: any;
  precio2: any;
  precio3: any;
  precios = {precio1: +'',precio2: +'',precio3: +''};
  producto: Producto = new Producto();
  productoF = {id: 0}
  FormatoP = {id: 0}
  productoFormato = {precio: +'', productoDTO: this.productoF, formatoDTO: this.FormatoP}
  productos: Producto[] = [];
  newProducto: Producto = new Producto();
  formatos: ProductoFormato[] = [];
  formato: Formato = new Formato();
  newProductoFormato: ProductoFormato = new ProductoFormato();
  permisosParaEditar = false;
  productoDeleted: Producto = new Producto();
  isModalProductoOpen = false;
  isModalFormatoOpen = false;
  isModalEditProductoOpen = false;
  cliente?: Cliente;
  cartaOcio?: CartaOcio;
  usuarioLogeado: any;
  token = {token: ''};
  @Input() ocio!: any;

  constructor(private route:ActivatedRoute,
              private cartaOcioService: CartaOcioService,
              private authService: AuthService,
              private usuarioService: UsuarioService,
              private clienteService: ClienteService,
              private ocioNocturnoService: OcionocturnoService,
              private router: Router,
              private toastController: ToastController,
              private loadingCtrl: LoadingController) { }


  ngOnInit() {
    this.getUsuario();
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
            console.log(this.newProductoFormato.productoDTO)
            this.cartaOcioService.crearProductoFormato(this.newProductoFormato).subscribe({
              next: createdProductFormato => {
                if (createdProductFormato.formatoDTO) {
                  this.productos.push(createdProductFormato.formatoDTO);
                  console.log(this.newProductoFormato)
                  this.productoModal(false);
                  this.getFormatos()
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

  crearProducto(){
    const token = this.getToken();
    if (token){
      this.cartaOcioService.crearProducto(this.newProducto,token).subscribe({
          next: value => {
            this.newProducto = value as Producto;
            this.productoModal(false);
          },
        error: e => {
          console.error(e);
        }
      })
    }
  }

  async crearMultiplesFormatos() {
    const formatos = [
      { id: 10, precio: this.precio1},
      { id: 5, precio: this.precio2},
      { id: 4, precio: this.precio3}
    ];
    const loading = await this.loadingCtrl.create({
      message: 'Creando producto...',
      duration: 1000,
    });
    formatos.forEach(formato => {
      const newPFormato = {
        formatoDTO: { id: formato.id },
        precio: formato.precio,
        productoDTO: { ...this.newProducto }
      };
      this.newProductoFormato = newPFormato;
      this.cartaOcioService.crearProductoFormato(this.newProductoFormato).subscribe({
        next: async value => {
          await loading.present();
          this.formatoModal(false);
          this.resetForm();
          this.getFormatos()
        },
        error: e => {
          console.error(e);
        }
      });
    });
  }


  agregarFormato() {
    const token = this.getToken();
    if (token) {
      this.newProductoFormato.productoDTO!.id = this.newProducto.id;
      this.cartaOcioService.crearProductoFormato(this.newProductoFormato).subscribe({
        next: createdProductFormato => {
          if (createdProductFormato.formatoDTO) {
            this.formatos.push(createdProductFormato);
            this.dataSourceProductos.data = this.formatos;
            this.formatoModal(false);
            this.resetForm();
          }
        },
        error: error => {
          console.error("Error creating product format", error);
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



  siguiente() {
    this.formatoModal(true);
    this.newProducto.username = this.authService.getUsername();
    this.crearProducto()
  }

  agregar() {
    this.crearMultiplesFormatos()
    this.formatoModal(false);
  }

  getProductos() {
    const token = this.getToken();
    this.cartaOcioService.listarProductos(token).subscribe({
      next: value => {
        this.productos = value as Producto[];
      },
      error: (error) => {
        console.error('Error al listar productos', error);
      }
    });
  }

  getFormatos() {
    const token = this.getToken();
    this.token.token = this.ocio.userDTO.username!;
    if (this.usuarioLogeado.rol?.toString() === "OCIONOCTURNO" && this.usuarioLogeado.id === this.ocio.userDTO.id){
    this.cartaOcioService.listarFormatos(token).subscribe({
      next: value => {
        this.formatos = value as ProductoFormato[];
        this.formatos.sort((a, b) => a!.productoDTO!.nombre!.localeCompare(b!.productoDTO!.nombre!));
        this.dataSourceProductos.data = this.formatos;
        this.dataSourceProductos.paginator = this.productosPaginator;
        this.dataSourceProductos.sort = this.productosSort;
      },
      error: (error) => {
        console.error(error);
      }
    })}
    else{
      this.cartaOcioService.listarFormatosCliente(this.token).subscribe({
        next: value => {
          this.formatos = value as ProductoFormato[];
          this.formatos.sort((a, b) => a!.productoDTO!.nombre!.localeCompare(b!.productoDTO!.nombre!));
          this.dataSourceProductos.data = this.formatos;
          this.dataSourceProductos.paginator = this.productosPaginator;
          this.dataSourceProductos.sort = this.productosSort;
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProductos.paginator) {
      this.dataSourceProductos.paginator.firstPage();
    }
  }

  editProducto(id: number) {
    this.productoEditModal(true);
    this.cartaOcioService.productoFormatoById(id).subscribe({
      next: value => {
        this.newProductoFormato = value as ProductoFormato;
        this.edit(this.newProductoFormato.productoDTO!.id!)
      }
    })


  }

  edit(id: number){
    this.cartaOcioService.productoById(id).subscribe({
      next: value => {
        this.newProducto = value as Producto;
      }
    })
  }

  async deleteProducto(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando producto...',
      duration: 500,
    });
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error inesperado durante el proceso de eliminación.',
      duration: 3000,
      position: "top",
      color: "danger"
    });
    this.cartaOcioService.eliminarProducto(id).subscribe({
      next: async value => {
        this.productoDeleted = value as Producto;
        // this.formatos = this.formatos.filter(p => p.id !== id);
        this.dataSourceProductos.data = this.formatos;
        await loading.present();
        this.resetForm();
        this.getFormatos()
        },
      error: async e => {
        await toast.present();
        console.error(e);
      }
    })
  }

  productoModal(b: boolean) {
    this.isModalProductoOpen = b;
  }

  productoEditModal(b: boolean) {
    this.isModalEditProductoOpen = b;
  }

  formatoModal(b: boolean) {
    this.isModalFormatoOpen = b;
  }

  async guardar(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Creando formato...',
      duration: 1000,
    });
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error inesperado durante el proceso de creación.',
      duration: 3000,
      position: "top",
      color: "danger"
    });
    this.newProductoFormato.productoDTO = this.newProducto;
    this.cartaOcioService.crearProductoFormato(this.newProductoFormato).subscribe({
      next: async value => {
        this.newProductoFormato = value as ProductoFormato;
        this.dataSourceProductos.data = this.productos;
        await loading.present();
        this.productoEditModal(false);
        this.resetForm();
        this.getFormatos()
      },
      error: async e => {
        await toast.present();
        console.error(e);
      }
    })
  }

  getUsuario() {
    this.usuarioService.getUsuarioToken().subscribe({
      next: value => {
        this.usuarioLogeado = value;
        this.getDTO(this.usuarioLogeado);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  getDTO(usuario: any) {
    if (usuario.rol == "CLIENTE") {
      this.clienteService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          this.cliente = value;
          this.getFormatos();
        },
        error: err => {
          console.error(err);
        }
      })
    } else if (usuario.rol == "OCIONOCTURNO" && usuario.id === this.ocio.userDTO.id){
      this.ocioNocturnoService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          this.permisosParaEditar = true;
          this.getFormatos();
          },
        error: err => {
          console.error(err);
        }
      })
    }
    else {
      this.ocioNocturnoService.getByIdUsuario(usuario.id).subscribe({
        next: value => {
          this.getFormatos();
        },
        error: err => {
          console.error(err);
        }
      })
      // this.router.navigate(["notium/error"])
    }
  }

  cancelar() {
    this.productoEditModal(false);
    this.resetForm();
  }
}
