import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SharedService } from "../../../../services/SharedService";
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatStepperModule,
  ]
})
export class VisualizarComponent implements OnInit {
  isLinear = true;
  mostrar: string = '';
  fecha: string = '';
  turno: string = '';
  data: string = 'mesas';

  constructor(private sharedService: SharedService) { }

  ngOnInit() { }

  enviarFecha() {
    console.log('La fecha es:', this.fecha)
  }

  enviarTurno() {
    console.log(this.turno)
  }
}

