import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headerocionocturno',
  templateUrl: './headerocionocturno.component.html',
  styleUrls: ['./headerocionocturno.component.scss'],
})
export class HeaderocionocturnoComponent  implements OnInit {

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

