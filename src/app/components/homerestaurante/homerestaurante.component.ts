import { Component, OnInit } from '@angular/core';
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {HeaderrestauranteComponent} from "../headerrestaurante/headerrestaurante.component";
import {FooterrestauranteComponent} from "../footerrestaurante/footerrestaurante.component";

@Component({
  selector: 'app-homerestaurante',
  templateUrl: './homerestaurante.component.html',
  styleUrls: ['./homerestaurante.component.scss'],
  imports: [
    HeaderrestauranteComponent,
    FooterrestauranteComponent
  ],
  standalone: true
})
export class HomerestauranteComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
