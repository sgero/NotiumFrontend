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
import Swal from 'sweetalert2'


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

  @ViewChild("stepper", { static: false }) stepper: MatStepper | undefined;

  constructor(private sharedService: SharedService,
              private restauranteService : RestauranteService,
              private dialogRef: MatDialog,
              private formBuilder: FormBuilder) {
  }


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
      complete: () => {
        console.log('Comprobación efectuada con resultado:', this.comprobacionCR);

        switch (this.comprobacionCR){
          case 1:
            /*Swal.fire({
              title: "Este código no existe",
              icon: "error"
            });*/
            alert("Este código no existe")
            break;

          case 2:
            /*Swal.fire({
              title: "Este código no es valido.",
              text: "No pertenece a este restaurante",
              icon: "error"
            });*/
            alert("No pertenece a este restaurante")
            break;

          case 3:
            /*Swal.fire({
              title: "Este código no es valido.",
              text: "Ya has hecho una valoración",
              icon: "error"
            });*/
            alert("Ya has hecho una valoración")
            break;

          case 4:
            this.stepper?.next();
            break;

          case 5:
            /*Swal.fire({
              title: "Este código no es valido.",
              text: "La reserva aún no se ha efectuado",
              icon: "error"
            });*/
            alert("La reserva aún no se ha efectuado")
            break;

          case 6:
            /*Swal.fire({
              title: "Este código no es valido.",
              icon: "error"
            });*/
            alert("Este código no es valido.")
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

    this.restauranteService.enviarValoracion(this.id_restaurante, this.codigoReserva, this.texto, Number(this.n_valoracion)).subscribe( {
      error: (error) => { console.error('Error al realizar la valoración del restaurante', error); },
      complete: () => { console.log('Valoracion realizada:', this.comprobacionCR); }
    });

  }




}
