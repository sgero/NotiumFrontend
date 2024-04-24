import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/error/error.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {HomerestauranteComponent} from "./components/homerestaurante/homerestaurante.component";
import {HomeocionocturnoComponent} from "./components/homeocionocturno/homeocionocturno.component";
import {RegistroComponent} from "./components/registro/registro.component";
import {LoginComponent} from "./components/login/login.component";

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
  {path: 'registrar', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'restaurante', component: HomerestauranteComponent},
  {path: 'ocionocturno', component: HomeocionocturnoComponent},


];
