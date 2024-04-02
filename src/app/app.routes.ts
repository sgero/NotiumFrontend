import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ErrorComponent} from "./components/error/error.component";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {HomerestauranteComponent} from "./components/homerestaurante/homerestaurante.component";
import {HomeocionocturnoComponent} from "./components/homeocionocturno/homeocionocturno.component";

export const routes: Routes = [
  // {
  //   path: 'home',
  //   loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {path: 'notium', component: HomeComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'restaurante', component: HomerestauranteComponent},
  {path: 'ocionocturno', component: HomeocionocturnoComponent},


];
