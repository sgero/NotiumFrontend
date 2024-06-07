import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, Validators, ReactiveFormsModule} from "@angular/forms";
import { SharedService } from "../../../../services/SharedService";
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatStepperModule } from "@angular/material/stepper";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatStepperModule,
        IonicModule,
    ]
})
export class VisualizarComponent implements OnInit {
  isLinear = true;
  mostrar: string = '';
  fecha: string = '';
  turno: string = '';
  data: string = 'mesas';
  fechaControl: FormControl;
  turnoControl: FormControl;

  constructor(private sharedService: SharedService) {
    this.fechaControl = new FormControl('', Validators.required);
    this.turnoControl = new FormControl('', Validators.required);
  }

  ngOnInit() { }

  enviarFecha() {
    if (this.fechaControl.valid) {
      console.log('La fecha es:', this.fecha);
    } else {
      console.log('Fecha inválida');
    }  }

  enviarTurno() {
    if (this.turnoControl.valid) {
      console.log('El turno es:', this.turno);
    } else {
      console.log('Turno inválido');
    }
  }
}

