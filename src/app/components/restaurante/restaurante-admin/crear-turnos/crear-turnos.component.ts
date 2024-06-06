import { Component, OnInit } from '@angular/core';
import {SharedService} from "../../../../services/SharedService";
import {MesaService} from "../../../../services/mesa.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TurnosService} from "../../../../services/turnos.service";
import {IonicModule} from "@ionic/angular";
import {MatIconModule} from "@angular/material/icon";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker"

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
        IonicModule,
        MatIconModule,
        NgxMaterialTimepickerModule
    ]
})
export class CrearTurnosComponent  implements OnInit {

  hora_inicio: string = '';
  hora_fin: string = '';
  id_restaurante: any;

  constructor(private sharedService: SharedService,
              private turnoService: TurnosService,
              private dialogRef: MatDialog) { }

  ngOnInit() {
    this.id_restaurante = this.sharedService.getIdParamsRestaurante();
  }

  nuevoTurno() {
    this.turnoService.crearTurno(this.hora_inicio, this.hora_fin, this.id_restaurante).subscribe({
      error: (error) => {console.error('Error al crear el turno', error);},
      complete: () => {console.log('Turno creado');}
    })

    this.cerrar()
  }

  cerrar(){
    this.dialogRef.closeAll();
  }
}
