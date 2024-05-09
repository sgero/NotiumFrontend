import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, FooterComponent, IonicModule],
  standalone: true
})
export class HomeComponent  implements OnInit {

  constructor(private router: Router) { }

  onEnterButtonClickRest(): void {

    this.router.navigate(['/notium/restaurante']);


  }

  onEnterButtonClickOcioN(): void {

    this.router.navigate(['/notium/ocionocturno']);


  }


  ngOnInit() {return null;}


}


