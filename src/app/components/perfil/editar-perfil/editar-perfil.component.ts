import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Usuario} from "../../../models/Usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";
import {SharedService} from "../../../services/SharedService";
import {NgIf} from "@angular/common";
import {ClienteService} from "../../../services/cliente.service";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {RestauranteService} from "../../../services/restaurante.service";

@Component({
    selector: 'app-editar-perfil',
    templateUrl: './editar-perfil.component.html',
    styleUrls: ['./editar-perfil.component.scss'],
  imports: [
    FormsModule,
    IonicModule,
    NgIf,
    ReactiveFormsModule
  ],
  standalone: true,
})
export class EditarPerfilComponent  implements OnInit {

  usuario = new Usuario();
  perfil:any;

  constructor(
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private restauranteService: RestauranteService,
    private ocionocturnoService: OcionocturnoService,
    private router: Router,
    private modalController: ModalController,
    private sharedService: SharedService,
  ) { }

  ngOnInit() {

    this.traerUser();

  }

  traerUser(){

    this.usuarioService.getUsuarioToken().subscribe(data=>{

      this.usuario = data;
      console.log(this.usuario);
      this.traerPerfil(this.usuario);

    })

  }

  traerPerfil(user:Usuario){

    this.usuarioService.traerPerfil(user).subscribe(data=>{

      this.perfil = data;
      console.log(this.perfil);

    })

  }

  editar(){

      if (this.usuario.rol == "CLIENTE"){

        // @ts-ignore
        this.clienteService.crearYModificarCliente().subscribe(data=>{



        })

      }else if(this.usuario.rol == "RESTAURANTE"){

        // @ts-ignore
        this.restauranteService.crearRestaurante().subscribe(data=>{



        })

      }else if(this.usuario.rol == "OCIO_NOCTURNO"){

        // @ts-ignore
        this.ocionocturnoService.crearOcioNocturno().subscribe(data=>{



        })

      }

  }

  closeModal() {
    this.modalController.dismiss();
  }

}
