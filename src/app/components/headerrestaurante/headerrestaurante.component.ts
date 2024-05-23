import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-headerrestaurante',
  templateUrl: './headerrestaurante.component.html',
  styleUrls: ['./headerrestaurante.component.scss'],
  standalone: true
})
export class HeaderrestauranteComponent  implements OnInit {

  constructor(private router: Router) { }

  onRegisterButtonClick() {

    this.router.navigate(['/notium/registrar']);

  }

  onLoginButtonClick() {

    this.router.navigate(['/notium/login']);


  }
  ngOnInit() {return null}

}
