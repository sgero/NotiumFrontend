import { Component, OnInit, Inject } from '@angular/core';
import { RestauranteService } from '../../../services/restaurante.service';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-crear-reserva',
    templateUrl: './crear-reserva.component.html',
    styleUrls: ['./crear-reserva.component.scss'],
    imports: [CommonModule, FormsModule, IonicModule],
    standalone: true,
})
export class CrearReservaComponent implements OnInit {
    fecha: string = '';
    numPersonas: number = 1;
    turnosDisponibles: any[] = [];
    turnoSeleccionado: any;
    restauranteId?: number;
    clienteId?: any;
    minFecha: string;

    constructor(
        private route: ActivatedRoute,
        private authService: UsuarioService,
        private reservaService: RestauranteService,
        private alertController: AlertController,
        private dialog: MatDialog,
        private modalController: ModalController,
        private dialogRef: MatDialogRef<CrearReservaComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        const today = new Date();
        this.minFecha = today.toISOString().split('T')[0];
    }

    ngOnInit() {
        this.restauranteId = this.data.restauranteId;
        this.authService.getUsuarioToken().subscribe(
            (usuario) => {
                this.clienteId = usuario;
            },
            (error) => {
                console.error('Error al obtener el usuario:', error);
            }
        );
    }

    buscarTurnos() {
        if (this.fecha && this.numPersonas && this.restauranteId) {
            this.reservaService.getTurnosDisponibles(this.numPersonas, this.fecha, this.restauranteId).subscribe(
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
                        fecha: this.fecha,
                        numPersonas: this.numPersonas,
                        turnoDTO: this.turnoSeleccionado,
                        restauranteDTO: { id: this.restauranteId },
                        usuarioDTO: { id: this.clienteId.id },
                    };

                    this.reservaService.crearReserva(reserva).subscribe(
                        async (data) => {
                            const alert = await this.alertController.create({
                                header: 'Reserva Confirmada',
                                message: `Su reserva ha sido confirmada. Código de reserva: ${data.codigoReserva}`,
                                buttons: ['OK'],
                            });
                            await alert.present();
                            this.dialog.closeAll(); // Cierra el modal de reserva
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
}
