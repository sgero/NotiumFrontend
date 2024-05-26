import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/error/error.component";
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomerestauranteComponent} from "./components/homerestaurante/homerestaurante.component";
import {HomeocionocturnoComponent} from "./components/homeocionocturno/homeocionocturno.component";
import {RegistroComponent} from "./components/registro/registro.component";
import {LoginComponent} from "./components/login/login.component";
import {RestauranteComponent} from "./components/restaurante/restaurante.component";
import {RestauranteUserComponent} from "./components/restaurante/restaurante-user/restaurante-user.component";
import {CartarestauranteComponent} from "./components/cartarestaurante/cartarestaurante.component";
import {EventDetailComponent} from "./components/homeocionocturno/event-detail/event-detail.component";
import {GestionocioComponent} from "./components/gestionocio/gestionocio.component";

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },
  {
    path: '',
    redirectTo: 'notium',
    pathMatch: 'full',
  },
  {path: 'notium', component: HomeComponent},
  {path: 'notium/registrar', component: RegistroComponent},
  {path: 'notium/login', component: LoginComponent},
  {path: 'notium/error', component: ErrorComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'cartaRestaurante', component: CartarestauranteComponent},
  {path: 'notium/restaurante', component: HomerestauranteComponent},
  {path: 'notium/ocionocturno', component: HomeocionocturnoComponent},
  {path: 'notium/restaurante/:id', component: RestauranteComponent},
  {path: 'notium/restaurante/user', component: RestauranteUserComponent},
  {path: 'notium/ocionocturno/evento/:id', component: EventDetailComponent},
  {path: 'notium/ocionocturno/:id', component: GestionocioComponent},
  {
    path: 'prueba',
    loadComponent: () => import('./components/restaurante/prueba/prueba.page').then( m => m.PruebaPage)
  }



];
