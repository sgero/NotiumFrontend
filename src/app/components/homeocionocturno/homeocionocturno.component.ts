import { Component, OnInit } from '@angular/core';
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {OcioNocturnoService} from "../../services/ocioNocturno.service";
import {Evento} from "../../models/Evento";
import {DatePipe, NgForOf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-homeocionocturno',
  templateUrl: './homeocionocturno.component.html',
  styleUrls: ['./homeocionocturno.component.scss'],
  imports: [
    FooterocionocturnoComponent,
    HeaderocionocturnoComponent,
    NgForOf,
    IonicModule,
    DatePipe
  ],
  standalone: true
})
export class HomeocionocturnoComponent  implements OnInit {

  eventosActivos: Evento[] = [];

  constructor(private ocioService : OcioNocturnoService) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.ocioService.getActivos().subscribe({
      next: value => {
        this.eventosActivos = value.object as Evento[];
      },
      error: e => {
        console.error(e);
      }
    })
  }

}
