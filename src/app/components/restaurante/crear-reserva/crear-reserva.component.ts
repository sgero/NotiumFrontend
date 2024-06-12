import { Component, OnInit, Inject } from '@angular/core';
import { RestauranteService } from '../../../services/restaurante.service';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from "@angular/material/stepper";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatInputModule, MatSuffix} from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import {
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter
} from '@angular/material/core';
import {MatList, MatListItem} from "@angular/material/list";  // Importar MatNativeDateModule y MAT_DATE_LOCALE
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from "jspdf-autotable";


@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStep,
    ReactiveFormsModule,
    MatStepper,
    MatStepLabel,
    MatInput,
    MatStepperNext,
    MatButton,
    MatSuffix,
    MatStepperPrevious,
    MatNativeDateModule,
    MatFormField,
    MatInputModule,
    MatList,
    MatListItem,
    MatDatepickerModule
   ],
  standalone: true,
  providers: [ provideNativeDateAdapter()
  ]
})
export class CrearReservaComponent implements OnInit {
  fechaForm: FormGroup = new FormGroup({});
  personasForm: FormGroup = new FormGroup({});
  turnosDisponibles: any[] = [];
  turnoSeleccionado: any;
  restauranteId?: number;
  clienteId?: any;
  minFecha: string;
  isLinear = true;
  actualrest: any;

  constructor(
    private route: ActivatedRoute,
    private authService: UsuarioService,
    private reservaService: RestauranteService,
    private alertController: AlertController,
    private dialog: MatDialog,
    private modalController: ModalController,
    private dialogRef: MatDialogRef<CrearReservaComponent>,
    private toastController: ToastController,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const today = new Date();
    this.minFecha = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.restauranteId = this.data.restauranteId;
    this.actualrest = this.data.actualrest;
    this.authService.getUsuarioToken().subscribe(
      (usuario) => {
        this.clienteId = usuario;
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );

    this.fechaForm = this._formBuilder.group({
      fecha: ['', Validators.required]
    });

    this.personasForm = this._formBuilder.group({
      numPersonas: ['', [Validators.required, Validators.min(1)]]
    });
  }

  buscarTurnos() {
    if (this.fechaForm.valid && this.personasForm.valid && this.restauranteId) {
      this.reservaService.getTurnosDisponibles(this.personasForm.value.numPersonas, this.fechaForm.value.fecha, this.restauranteId).subscribe(
        (data: any[]) => {
          this.turnosDisponibles = data;
        },
        (error) => {
          console.error('Error al buscar turnos disponibles:', error);
        }
      );
    }
  }

  hacerReserva() {
    this.authService.getUsuarioToken().subscribe(
      (usuario) => {
        const clienteId = usuario;
        if (this.turnoSeleccionado && this.restauranteId && clienteId) {
          const reserva = {
            fecha: this.fechaForm.value.fecha,
            numPersonas: Number(this.personasForm.value.numPersonas),
            turnoDTO: this.turnoSeleccionado,
            restauranteDTO: { id: this.restauranteId },
            usuarioDTO: { id: this.clienteId.id },
          };

          this.reservaService.crearReserva(reserva).subscribe(
            async (data) => {
              this.generarPDFReserva(data.codigoReserva);
              const alert = await this.alertController.create({
                header: 'Reserva Confirmada',
                message: `Su reserva ha sido confirmada. Código de reserva: ${data.codigoReserva}`,
                buttons: ['OK'],
              });
              await alert.present();
              this.dialog.closeAll();
            },
            async (error) => {
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'Hubo un problema al realizar la reserva.',
                buttons: ['OK'],
              });
              await alert.present();
              console.error('Error al crear la reserva:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  async cancelarReserva() {
    await this.dialogRef.close(); // Cierra el modal
  }

  seleccionarTurno(turno: any) {
    this.turnoSeleccionado = turno;
  }

  generarPDFReserva(codigo: string) {
    const reserva = {
      fecha: this.fechaForm.value.fecha,
      numPersonas: Number(this.personasForm.value.numPersonas),
      turnoDTO: this.turnoSeleccionado,
      restauranteDTO: { id: this.restauranteId },
      usuarioDTO: { id: this.clienteId.id }
    };

    const doc = new jsPDF();

    // Título del PDF
    doc.setFontSize(18);
    doc.text('Reserva', 14, 22);

    // Datos de la reserva en columnas
    const columns = ['Campo', 'Valor'];
    const rows = [
      ['Código de Reserva', codigo],
      ['Fecha', reserva.fecha],
      ['Número de Personas', reserva.numPersonas],
      ['Turno', this.turnoSeleccionado.hora_inicio + " a " + this.turnoSeleccionado.hora_fin],
      ['Restaurante', this.actualrest.nombre],
      ['Usuario', this.clienteId.username]
    ];

    // Generar la tabla
    autoTable(doc, {
      startY: 30,
      head: [columns],
      body: rows
    });

    // Guardar el PDF
    doc.save('reserva.pdf');
  }

}
