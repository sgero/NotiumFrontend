import {EntradaOcioCliente} from "./EntradaOcioCliente";
import {ListaOcioCliente} from "./ListaOcioCliente";
import {ComprarReservadoDTO} from "./ComprarReservadoDTO";

export class ClienteEntradasCompradasDTO {
  entradasGeneralesCompradasPasadas?: EntradaOcioCliente[];
  entradasGeneralesCompradasFuturas?:EntradaOcioCliente[];
  reservadosCompradosPasados?:ComprarReservadoDTO[];
  reservadosCompradosFuturos?:ComprarReservadoDTO[];
  listasCompradasPasadas?:ListaOcioCliente[];
  listasCompradasFuturas?:ListaOcioCliente[];
}
