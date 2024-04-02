import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  onToggleButtonClick() {

    console.log('Se hizo clic en el botón Toggle');
  }

  onRegisterButtonClick() {

    console.log('Se hizo clic en el botón Register');
  }

  onLoginButtonClick() {

    console.log('Se hizo clic en el botón Login');
  }
  ngOnInit() {}

}
