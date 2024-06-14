import {Component, OnInit} from '@angular/core';
import {IonicModule, ToastController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {RestauranteService} from "../../services/restaurante.service";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {RppService} from "../../services/rpp.service";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  imports: [
    IonicModule,
    CommonModule
  ],
  standalone: true
})
export class AdminPanelComponent implements OnInit{
  rol: string = '';
  usuarios:any;
  mensaje:string = '';
  isLoading: boolean = true;
  usuarioLogued:any;

  clientes:any;
  restaurantes:any;
  ocios_nocturnos:any;
  rpps:any;

  constructor(private usuarioService: UsuarioService,
              private toastController: ToastController,
              private router: Router,
              private clienteService: ClienteService,
              private restauranteService: RestauranteService,
              private ocionocturnoService: OcionocturnoService,
              private rppService: RppService,) {
  }

  ngOnInit() {
    this.traerUsuarios();
    this.getUsuario();
  }

  elegirRol(rol: string) {
    this.rol = rol;
    switch (rol) {
      case 'CLIENTE':
        this.traerClientes();
        break;
      case 'RESTAURANTE':
        this.traerRestaurantes();
        break;
      case 'OCIO NOCTURNO':
        this.traerOciosNocturnos();
        break;
      case 'RPP':
        this.traerRpps();
        break;
      default:
        break;
    }
  }

  getUsuario(){

    this.usuarioService.getUsuarioToken().subscribe(data=>{

      this.usuarioLogued = data;
      if (this.usuarioLogued.rol !== 'ADMIN'){

        this.router.navigate(["notium/error"]);
        const toast =this.toastController.create({
          message: 'No puedes acceder a esta página.',
          duration: 4000,
          position: 'top',
          color: "danger"
        }).then(toast => toast.present());

      }

    })

  }

  eliminarCuenta(usuario){

    this.usuarioService.eliminarCuenta(usuario).subscribe(data=>{

      this.mensaje = data['message'];
      this.toastController.create({
        message: this.mensaje,
        duration: 3000,
        position: 'top',
        color: 'danger'
      }).then(toast => toast.present());

      this.traerUsuarios();

    });

  }

  traerUsuarios(){
    this.isLoading = true;
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.usuarios = data;
      this.usuarios = this.usuarios.sort((a, b) => a.id - b.id);
      console.log(this.usuarios);
      this.isLoading = false;

    }, error => {

      console.error('Error al cargar los usuarios', error);
      this.isLoading = false;

    })
  }

  traerClientes(){
    this.isLoading = true;
    this.clienteService.getClientes().subscribe(data=>{
      this.clientes = data;
      this.clientes = this.clientes.sort((a, b) => a.id - b.id);
      console.log(this.clientes);
      this.isLoading = false;

    }, error => {

      console.error('Error al cargar los clientes', error);
      this.isLoading = false;

    })
  }

  traerRestaurantes(){
    this.isLoading = true;
    this.restauranteService.listarRestaurantes().subscribe(data=>{
      this.restaurantes = data;
      this.restaurantes = this.restaurantes.sort((a, b) => a.id - b.id);
      console.log(this.restaurantes);
      this.isLoading = false;

    }, error => {

      console.error('Error al cargar los restaurantes', error);
      this.isLoading = false;

    })
  }

  traerOciosNocturnos(){
    this.isLoading = true;
    this.ocionocturnoService.listarOcioNocturno().subscribe(data=>{
      this.ocios_nocturnos = data;
      this.ocios_nocturnos = this.ocios_nocturnos.sort((a, b) => a.id - b.id);
      console.log(this.ocios_nocturnos);
      this.isLoading = false;

    }, error => {

      console.error('Error al cargar los ocios nocturnos', error);
      this.isLoading = false;

    })
  }

  traerRpps(){
    this.isLoading = true;
    this.rppService.listarRpp().subscribe(data=>{
      this.rpps = data;
      this.rpps = this.rpps.sort((a, b) => a.id - b.id);
      console.log(this.rpps);
      this.isLoading = false;

    }, error => {

      console.error('Error al cargar los ocios Rpps', error);
      this.isLoading = false;

    })
  }

}
