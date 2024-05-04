import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-hacer-reserva',
  templateUrl: './hacer-reserva.component.html',
  styleUrls: ['./hacer-reserva.component.scss'],
})

@NgModule({
  imports:[CommonModule, IonicModule],
  declarations: [HacerReservaComponent],
  entryComponents: [HacerReservaComponent],
  exports: [HacerReservaComponent]
})

export class HacerReservaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
