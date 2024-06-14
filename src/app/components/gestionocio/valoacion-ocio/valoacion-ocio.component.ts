import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from "@angular/common";
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {SharedService} from "../../../services/SharedService";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {RestauranteService} from "../../../services/restaurante.service";
import Swal from 'sweetalert2'
import {OcionocturnoService} from "../../../services/ocionocturno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {ComentarioOcio} from "../../../models/ComentarioOcio";
import {OcioNocturno} from "../../../models/OcioNocturno";
import {ListarValoracionesOcioComponent} from "../listar-valoraciones-ocio/listar-valoraciones-ocio.component";

@Component({
  selector: 'app-valoacion-ocio',
  templateUrl: './valoacion-ocio.component.html',
  styleUrls: ['./valoacion-ocio.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatStepperModule,
    MatStepper,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class ValoacionOcioComponent  implements OnInit {
  isLinear = true;
  codigoReserva: any;
  comprobacionCR: number = 0;
  texto: string = '';
  n_valoracion: any;
  id_ocio: any;
  evento: any;
  id_usuario: any;
  firstStepFormGroup: FormGroup = new FormGroup({});
  secondStepFormGroup: FormGroup = new FormGroup({});
  comentariosOcio: ComentarioOcio[] = [];

  @ViewChild("stepper", { static: false }) stepper: MatStepper | undefined;

  constructor(private sharedService: SharedService,
              private ocioNocturnoService : OcionocturnoService,
              private dialogRef: MatDialog,
              private formBuilder: FormBuilder,
              private router : Router,
              private _route: ActivatedRoute,
              private toastController : ToastController,
              @Inject(MAT_DIALOG_DATA) public data: any,
  )
  {
    this.evento = this.data.evento;
    this.id_ocio = this.data.evento.ocioNocturnoDTO.id;
    this.codigoReserva = this.data.codigoValoracion;
  }

  ngOnInit() {

    this.firstStepFormGroup= this.formBuilder.group({
      codigoReservaForm: ["", Validators.required]
    });

    this.secondStepFormGroup = this.formBuilder.group({
      textoForm: ["", Validators.required],
      n_valoracionForm: ["", Validators.required]
    });

  }


  cerrarModal(){
    this.dialogRef.closeAll();
  }

  validarCodigo(){
    this.ocioNocturnoService.comprobarCodigoOcio(this.evento, this.id_ocio, this.codigoReserva).subscribe( {
      next: (responseData) => {
        this.comprobacionCR = responseData;
      },
      error: (error) => {
        console.error('Error al obtener la comprobación al restaurante', error);
      },
      complete: async () => {
        console.log('Comprobación efectuada con resultado:', this.comprobacionCR);


        let message = '';
        switch (this.comprobacionCR) {
          case 1:
            message = 'Este código no existe';
            break;
          case 2:
            message = 'El código no pertenece a este establecimiento';
            break;
          case 3:
            message = 'Ya has hecho una valoración';
            break;
          case 4:
            this.stepper?.next();
            return;
          case 5:
            message = 'El evento aún no ha ocurrido';
            break;
          case 6:
            message = 'Este código no es válido';
            break;
        }

        if (message) {
          const toast = await this.toastController.create({
            message: message,
            duration: 4000,
            position: 'top',
            color: 'danger',
            cssClass: 'custom-toast'
          });
          await toast.present();
        }

      }
    });
  }

  next(){
    this.stepper?.next();
  }

  mandarValoracion(){
    this.ocioNocturnoService.enviarValoracionOcio(Number(this.id_ocio), this.codigoReserva, this.texto, Number(this.n_valoracion), this.data.cliente!).subscribe( {
      next: async value => {
        if (value) {
          const toast = await this.toastController.create({
            message: 'Valoración registrada con éxito',
            duration: 4000,
            position: 'top',
            color: 'success',
          });
          await toast.present();
          this.openValoraciones(this.data.evento.ocioNocturnoDTO);
        }
      },
      error: (error) => { console.error('Error al realizar la valoración del restaurante', error); },
      complete: () => { console.log('Valoracion realizada:', this.comprobacionCR); }
    });
  }

  openValoraciones(ocio: OcioNocturno) {
    if (ocio) {
      this.dialogRef.open(ListarValoracionesOcioComponent, {
        data: {
          ocio: ocio!
        }
      });
    }
  }


}
