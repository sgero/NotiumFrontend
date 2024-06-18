import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {Mesa} from "../../../../models/Mesa";
import {SharedService} from "../../../../services/SharedService";
import {RestauranteService} from "../../../../services/restaurante.service";
import {Restaurante} from "../../../../models/Restaurante";
import {MesaService} from "../../../../services/mesa.service";
import {MatDialog,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input"
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {IonicModule, ToastController} from "@ionic/angular";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-crear-mesas',
  templateUrl: './crear-mesas.component.html',
  styleUrls: ['./crear-mesas.component.scss'],
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
        MatCheckbox,
        IonicModule,
        MatIconModule
    ]
})
export class CrearMesasComponent  implements OnInit {

  numeroPlazas: number = 0;
  reservada: boolean = false;
  id_restaurante: any;

  constructor(private sharedService: SharedService,
              private mesaService: MesaService,
              private dialogRef: MatDialog,
              private toastController: ToastController) { }

  ngOnInit() {

    this.id_restaurante = this.sharedService.getIdParamsRestaurante();

  }

  nuevaMesaCreada() {

    this.mesaService.crearMesa(Number(this.numeroPlazas), this.reservada, this.id_restaurante).subscribe({
      error: async (error) => {
        console.error('Error al realizar la valoración del restaurante', error);
        const toast1 = await this.toastController.create({
          message: 'La mesa no se ha podido crear.',
          duration: 3000,
          position: "bottom"
        });
        await toast1.present();
      },
      complete: async () => {
        console.log('Mesa creada');
        const toast1 = await this.toastController.create({
          message: '¡Mesa creada con éxito!',
          duration: 3000,
          position: "top"
        });
        await toast1.present();
      }
    })
    this.cerrar()
  }

  cerrar(){
    this.dialogRef.closeAll();
  }

}
