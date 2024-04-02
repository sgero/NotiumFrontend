import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerrestaurante',
  templateUrl: './headerrestaurante.component.html',
  styleUrls: ['./headerrestaurante.component.scss'],
  standalone: true
})
export class HeaderrestauranteComponent  implements OnInit {

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
