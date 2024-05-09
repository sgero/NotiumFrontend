import {Component, NgModule, OnInit} from '@angular/core';
import {ComentarioRestaurante} from "../../../models/ComentarioRestaurante";
import {SharedService} from "../../../services/SharedService";
import {
  MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

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
  ],
})


export class HacerValoracionComponent  implements OnInit {

  valoracion = new ComentarioRestaurante();

  constructor(private sharedService: SharedService,
              private dialogRef: MatDialog) { }

  ngOnInit(



  ) {}


  enviarValoracion(){
   //
    // this.sharedService.getRestaurante().id = this.valoracion.restaurante;
  }



  cerrarModal(){
    this.dialogRef.closeAll();
    console.log(this.valoracion)
  }

}
