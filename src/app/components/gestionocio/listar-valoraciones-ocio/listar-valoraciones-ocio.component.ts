import {Component, Inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {OcioNocturno} from "../../../models/OcioNocturno";

@Component({
  selector: 'app-listar-valoraciones-ocio',
  templateUrl: './listar-valoraciones-ocio.component.html',
  styleUrls: ['./listar-valoraciones-ocio.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class ListarValoracionesOcioComponent  implements OnInit {
  valoraciones: ComentarioRestaurante [] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.getValoracionesByOcio(this.data.ocio);
  }

  getValoracionesByOcio(ocio:OcioNocturno) {

  }
}
