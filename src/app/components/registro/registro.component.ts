import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class RegistroComponent   {

  usuario = new Usuario();

  constructor(private usuarioService : UsuarioService, private router : Router) { }

  verificarContrasenas(): void{

    let contraseña1 = document.getElementById("contraseña");
    let contraseña2 = document.getElementById("repitecontraseña");

    if (contraseña1 !== contraseña2) {

      console.error("Las contraseñas no coinciden.");

    }else {

      this.registrar()

    }
  }

  registrar(){

    this.usuarioService.registrarUsuario(this.usuario).subscribe(data=>{

      console.log(data)

    })

  }

}
