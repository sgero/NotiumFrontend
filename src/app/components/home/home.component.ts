import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule} from "@ionic/angular";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, FooterComponent, IonicModule],
  standalone: true
})
export class HomeComponent  implements OnInit {

  constructor() { }

  onEnterButtonClickRest(): void {
    // Lógica para lo que sucede al hacer clic en el botón "Enter"


    console.log('Se hizo clic en el botón Enter');
  }

  onEnterButtonClickOcioN(): void {
    // Lógica para lo que sucede al hacer clic en el botón "Enter"


    console.log('Se hizo clic en el botón Enter');
  }


  ngOnInit() {}


}


