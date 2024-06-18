import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../../../services/SharedService";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import * as moment from 'moment';
import { TurnosService } from "../../../../services/turnos.service";
import {IonicModule, ToastController} from "@ionic/angular";
import { MatIconModule } from "@angular/material/icon";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker"
import { MatStepperNext } from "@angular/material/stepper";
import { DiasARepetirCicloEventoOcio } from "../../../../models/DiasARepetirCicloEventoOcio";
import { MatOption } from "@angular/material/autocomplete";
import { MatCheckbox } from "@angular/material/checkbox";
import { Turno } from "../../../../models/Turno";


@Component({
  selector: 'app-crear-turnos',
  templateUrl: './crear-turnos.component.html',
  styleUrls: ['./crear-turnos.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatStepperNext,
    MatOption,
    MatCheckbox,
  ]
})
export class CrearTurnosComponent implements OnInit {
  isLinear = true;
  hora_inicio: any;
  hora_fin: any;
  id_restaurante: any;
  diasARepetirTurno: string[] = Object.keys(DiasARepetirCicloEventoOcio).filter(key => isNaN(Number(key))) as string[];
  diasSeleccionado: string[] = [];
 // minHoraFin: string = '';


  addSecondsToTime(controlName: string): void {
    let timeValue = this.turno_nuevo.get(controlName)?.value;
    if (timeValue) {
      let timeParts = timeValue.split(':');
      if (timeParts.length === 2) {
        // Add seconds if they are not present
        timeValue = `${timeParts[0]}:${timeParts[1]}:00`;
        this.turno_nuevo.get(controlName)?.setValue(timeValue, { emitEvent: false });
      } else if (timeParts.length === 3 && timeParts[2] === '00') {
        // Ensure seconds are set to "00"
        timeValue = `${timeParts[0]}:${timeParts[1]}:00`;
        this.turno_nuevo.get(controlName)?.setValue(timeValue, { emitEvent: false });
      }
    }
  }

  turno: Turno = new Turno();
  turno_nuevo = this.formBuilder.group({
    diaForm: ["", Validators.required],
    horainicioForm: ["", Validators.required],
    horafinForm: ["", Validators.required]
  })


  constructor(private sharedService: SharedService,
              private turnoService: TurnosService,
              private dialogRef: MatDialog,
              private formBuilder: FormBuilder,
              private toastController: ToastController) {
  }


  ngOnInit(): void {

    this.id_restaurante = this.sharedService.getIdParamsRestaurante();
  }


  diaElegido($event){
    const d = $event.target.value
    const c = $event.target.checked
    console.log(d)
    console.log(c)
    console.log(this.diasSeleccionado.includes(d));
    if(this.diasSeleccionado.includes(d) == false){
      this.diasSeleccionado.push(d);
    }
  }

  async nuevoTurno() {

    this.addSecondsToTime('horainicioForm');
    this.addSecondsToTime('horafinForm');

    // Get the formatted time values from the form
    this.hora_inicio = this.turno_nuevo.get('horainicioForm')?.value;
    this.hora_fin = this.turno_nuevo.get('horafinForm')?.value;

    if (this.hora_inicio && this.hora_fin) {
      const inicio = moment(this.hora_inicio, 'HH:mm:ss');
      const fin = moment(this.hora_fin, 'HH:mm:ss');

      if (inicio.isBefore(fin) || inicio.isSame(fin)) {
        const toast1 = await this.toastController.create({
          message: 'Error. La hora de fin es inferior a la inicio.',
          duration: 5000,
          position: "bottom"
        });
        await toast1.present();
      } else {
        this.turnoService.crearTurno(this.hora_inicio, this.hora_fin, this.id_restaurante, this.diasSeleccionado).subscribe({
          error: async (error) => {
            console.error('Error al crear el turno:', error);
            const toast1 = await this.toastController.create({
              message: 'Este turno no se ha podido registrar.',
              duration: 3000,
              position: "bottom"
            });
            await toast1.present();
          },
          complete: async () => {
            console.log('Registrado el turno correctamente')
            const toast1 = await this.toastController.create({
              message: 'Turno registrado correctamente.',
              duration: 3000,
              position: "top"
            });
            await toast1.present();
          }
        });
      }
    } else {
      console.log('Faltan datos de hora.');
      // Aquí puedes manejar el caso de error
    }
  }
}
