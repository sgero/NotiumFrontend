import {OcioNocturno} from "./OcioNocturno";

export class CartaOcio{
  id?: number;
  activo?: boolean = true;
  ocioNocturno: OcioNocturno = new OcioNocturno();
}
