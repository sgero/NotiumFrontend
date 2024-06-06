import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from "@angular/common";
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {SharedService} from "../../../services/SharedService";
import {MatDialog,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {RestauranteService} from "../../../services/restaurante.service";
import {LoadingController, ToastController} from "@ionic/angular";


@Component({
  selector: 'app-hacer-valoracion',
  templateUrl: './hacer-valoracion.component.html',
  styleUrls: ['./hacer-valoracion.component.scss'],
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


export class HacerValoracionComponent  implements OnInit {
  isLinear = true;
  codigoReserva: string = '';
  comprobacionCR: number = 0;
  texto: string = '';
  n_valoracion: any;
  id_restaurante: any;
  firstStepFormGroup: FormGroup = new FormGroup({});
  secondStepFormGroup: FormGroup = new FormGroup({});
  id_usuario: any;

  @ViewChild("stepper", { static: false }) stepper: MatStepper | undefined;

  constructor(private sharedService: SharedService,
              private restauranteService : RestauranteService,
              private dialogRef: MatDialog,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private loadingCtrl: LoadingController,) {}


  traerIdRestaurante(){
     this.id_restaurante = this.sharedService.getIdParamsRestaurante();
  }

  ngOnInit() {

    this.firstStepFormGroup= this.formBuilder.group({
      codigoReservaForm: ["", Validators.required]
    });

    this.secondStepFormGroup = this.formBuilder.group({
      textoForm: ["", Validators.required],
      n_valoracionForm: ["", Validators.required]
    });


    this.traerIdRestaurante();
  }


  cerrarModal(){
    this.dialogRef.closeAll();
  }

  validarCodigo(){

    this.restauranteService.comprobarCodigoReservaRestaurante(this.id_restaurante, this.codigoReserva).subscribe( {
      next: (responseData) => {
        this.comprobacionCR = responseData;
      },
      error: (error) => {
        console.error('Error al obtener la comprobación al restaurante', error);
      },
      complete: async () => {
        console.log('Comprobación efectuada con resultado:', this.comprobacionCR);

        switch (this.comprobacionCR) {
          case 1:
            const toast1 = await this.toastController.create({
              message: 'Este código no existe.',
              duration: 3000,
              position: "top"
            });
            await toast1.present();
            break;

          case 2:
            const toast2 = await this.toastController.create({
              message: 'Este código no es valido. No pertenece a este restaurante',
              duration: 3000,
              position: "top"
            });
            await toast2.present();
            break;

          case 3:
            const toast3 = await this.toastController.create({
              message: 'Este código no es valido. Ya has hecho una valoración.',
              duration: 3000,
              position: "top"
            });
            await toast3.present();
            break;

          case 4:
            this.stepper?.next();
            break;

          case 5:
            const toast5 = await this.toastController.create({
              message: 'Este código no es valido. La reserva aún no se ha efectuado',
              duration: 3000,
              position: "top"
            });
            await toast5.present();
            break;

          case 6:
            const toast6 = await this.toastController.create({
              message: 'Este código no es valido.',
              duration: 3000,
              position: "top"
            });
            await toast6.present();
            break;
        }


        /*if(this.comprobacionCR == 2){
          this.stepper?.next();
          console.log("Ejecutado")
        }*/
      }
    });
  }

  next(){
    this.stepper?.next();
  }

  mandarValoracion(){

    this.id_usuario = this.sharedService.getUsuarioToken().id;

    this.restauranteService.enviarValoracion(this.id_restaurante, this.codigoReserva, this.texto, Number(this.n_valoracion), this.id_usuario).subscribe( {
      error: (error) => { console.error('Error al realizar la valoración del restaurante', error); },
      complete: async () => {
        console.log('Valoracion realizada:', this.comprobacionCR);
        const loading = await this.loadingCtrl.create({
          message: 'Enviando valoración...',
          duration: 500,
        });
      }
    });

  }




}
