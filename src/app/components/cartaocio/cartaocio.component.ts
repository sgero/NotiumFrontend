import {Component, OnInit, ViewChild} from '@angular/core';
import {OverlayEventDetail} from "@ionic/core";
import {Rpp} from "../../models/Rpp";
import {IonicModule, IonModal} from "@ionic/angular";
import {Producto} from "../../models/Producto";
import {ProductoFormato} from "../../models/ProductoFormato";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CartaOcioService} from "../../services/cartaOcio.service";
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";

@Component({
  selector: 'app-cartaocio',
  templateUrl: './cartaocio.component.html',
  styleUrls: ['./cartaocio.component.scss'],
  imports: [
    IonicModule,
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
  ],
  standalone: true
})
export class CartaocioComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  producto = {nombre: '',tipoCategoria: '',username: ''}
  token = {token: ''}
  productos: any;
  productoF = {id: +''}
  FormatoP = {id: +''}
  productoFormato = {precio: +'', productoDTO: this.productoF, formatoDTO: this.FormatoP}
  refresco: boolean = false;
  agua: boolean = false;
  cerveza: boolean = false;
  bebidaAlcoholica: boolean = false;
  coctel: boolean = false;
  constructor(private route:ActivatedRoute,
              private cartaOcioService: CartaOcioService) { }

  newProducto: Producto = new Producto();
  newProductoFormato:  ProductoFormato = new ProductoFormato();
  ngOnInit() {}



  onWillDismiss($event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Rpp>>;
    if (ev.detail.role === 'agregar') {
      //metodo q quieres llamar
    }
  }

  cancelar() {
    this.modal.dismiss(null, 'cancelar')
  }

  agregar() {
    this.modal.dismiss(this.newProducto, 'agregar')
  }

}
