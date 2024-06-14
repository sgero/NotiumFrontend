import {Component, Inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OcioNocturno} from "../../../models/OcioNocturno";
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {ComentarioOcio} from "../../../models/ComentarioOcio";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-listar-valoraciones-ocio',
  templateUrl: './listar-valoraciones-ocio.component.html',
  styleUrls: ['./listar-valoraciones-ocio.component.scss'],
  imports: [
    NgForOf,
    RatingModule,
    FormsModule,
    MatIcon,
  ],
  standalone: true
})
export class ListarValoracionesOcioComponent implements OnInit {
  valoraciones: ComentarioOcio [] = [];
  ocio!: OcioNocturno;

  constructor(
    private ocioNocturnoService: OcionocturnoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.ocio = this.data.ocio;
  }

  ngOnInit() {
    this.getValoracionesByOcio(this.data.ocio);
  }

  getValoracionesByOcio(ocio: OcioNocturno) {
    this.ocioNocturnoService.valorcionesPorRestaurante(ocio.id!).subscribe({
      next: (data) => {
        this.valoraciones = data;
        this.valoraciones.forEach(m => {
          const fechaString = m.fecha_comentario!;
          const fecha = new Date(fechaString!);
          const opcionesFormato: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          };
          const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFormato).format(fecha);
          m.fecha_comentario = formatoFecha.charAt(0).toUpperCase() + formatoFecha.slice(1);
        });
      },
      error: (error) => {
        console.error('Error al listar las valoraciones del ocio', error);
      },
      complete: () => {
        console.log('Las valoraciones del ocio:', this.valoraciones);
      }
    });
  }

}
