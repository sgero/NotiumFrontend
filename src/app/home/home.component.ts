import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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


