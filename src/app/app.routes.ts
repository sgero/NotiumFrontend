import {Routes} from '@angular/router';
import {ErrorComponent} from "./components/error/error.component";
import {HomerestauranteComponent} from "./components/homerestaurante/homerestaurante.component";
import {HomeocionocturnoComponent} from "./components/homeocionocturno/homeocionocturno.component";
import {RegistroComponent} from "./components/registro/registro.component";
import {LoginComponent} from "./components/login/login.component";
import {RestauranteComponent} from "./components/restaurante/restaurante.component";
import {RestauranteUserComponent} from "./components/restaurante/restaurante-user/restaurante-user.component";
import {CartarestauranteComponent} from "./components/cartarestaurante/cartarestaurante.component";
import {CrearReservaComponent} from "./components/restaurante/crear-reserva/crear-reserva.component";
import {EventDetailComponent} from "./components/homeocionocturno/event-detail/event-detail.component";
import {GestionocioComponent} from "./components/gestionocio/gestionocio.component";
import {CartaocioComponent} from "./components/cartaocio/cartaocio.component";
import {CartadescarterComponent} from "./components/cartadescarter/cartadescarter.component";
import {HomepComponent} from "./components/homep/homep.component";
import {PerfilComponent} from "./components/perfil/perfil.component";
import {EditarPerfilComponent} from "./components/perfil/editar-perfil/editar-perfil.component";
import {MisTicketsReservasComponent} from "./components/mis-tickets-reservas/mis-tickets-reservas.component";

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'notium',
    pathMatch: 'full',
  },

  {path: 'notium', component: HomepComponent},
  {path: 'notium/registrar', component: RegistroComponent},
  {path: 'notium/login', component: LoginComponent},
  {path: 'notium/error', component: ErrorComponent},
  {path: 'cartaRestaurante', component: CartarestauranteComponent},
  {path: 'cartaRDescarte', component: CartadescarterComponent},
  {path: 'notium/restaurante', component: HomerestauranteComponent},
  {path: 'notium/ocionocturno', component: HomeocionocturnoComponent},
  {path: 'notium/restaurante/:id', component: RestauranteComponent},
  {path: 'notium/restaurante/user', component: RestauranteUserComponent},
  {path: 'notium/ocionocturno/evento/:id', component: EventDetailComponent},
  {path: 'notium/ocionocturno/:id', component: GestionocioComponent},
  {path: 'cartaOcio', component: CartaocioComponent},
  {path: 'notium/reservar/:restauranteId', component: CrearReservaComponent},
  {path: 'notium/ocionocturno/evento/:id', component: EventDetailComponent},
  {path: 'notium/perfil/:id', component: PerfilComponent},
  {path: 'notium/perfil/editar', component: EditarPerfilComponent},
  {path: 'notium/ticketsyreservas', component: MisTicketsReservasComponent},

];
