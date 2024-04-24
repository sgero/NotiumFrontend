import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  onToggleButtonClick() {

    console.log('Se hizo clic en el botón Toggle');
  }

  onRegisterButtonClick() {

    console.log('Se hizo clic en el botón Register');
    this.router.navigate(['/registrar']);
  }

  onLoginButtonClick() {

    console.log('Se hizo clic en el botón Login');
    this.router.navigate(['/login']);

  }
  ngOnInit() {}

}
