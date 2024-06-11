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
import { TurnosService } from "../../../../services/turnos.service";
import { IonicModule } from "@ionic/angular";
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
    MatCheckbox
  ]
})
export class CrearTurnosComponent implements OnInit {
  isLinear = true;
  hora_inicio: string = '';
  hora_fin: string = '';
  id_restaurante: any;
  diasARepetirTurno: string[] = Object.keys(DiasARepetirCicloEventoOcio).filter(key => isNaN(Number(key))) as string[];
  turno: Turno = new Turno();
  turno_nuevo = this.formBuilder.group({
    diaForm: ["", Validators.required],
    horainicioForm: ["", Validators.required],
    horafinForm: ["", Validators.required]

  })

  constructor(private sharedService: SharedService,
              private turnoService: TurnosService,
              private dialogRef: MatDialog,
              private formBuilder: FormBuilder) {
    /*this.turnoNuevo = this.formBuilder.group({
      diasARepetir: this.formBuilder.array(this.diasARepetirTurno.map(dia => new FormControl(false)))
    });*/
  }

  ngOnInit(): void {

    this.id_restaurante = this.sharedService.getIdParamsRestaurante();
  }

  nuevoTurno() {

    const formsValues = this.turno_nuevo.value
    let d: any;
    d = formsValues.diaForm
    this.turno.diasARepetirTurno = d;
    console.log(this.turno.diasARepetirTurno, d);




   /* const selectedDias = this.diasForm.value.diasARepetir
      .map((checked, index) => checked ? this.diasARepetirTurno[index] : null)
      .filter(value => value !== null);
    console.log(selectedDias); // Días seleccionados

    this.turno_nuevo.diasARepetirTurno = selectedDias;

    console.log(this.turno_nuevo.diasARepetirTurno);

    /*this.turnoService.crearTurno(this.hora_inicio, this.hora_fin, this.id_restaurante).subscribe({
      error: (error) => { console.error('Error al crear el turno', error); },
      complete: () => { console.log('Turno creado'); }
    })*/
  }
}
