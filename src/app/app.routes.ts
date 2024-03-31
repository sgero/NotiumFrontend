import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./error/error.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HomerestauranteComponent} from "./homerestaurante/homerestaurante.component";
import {HomeocionocturnoComponent} from "./homeocionocturno/homeocionocturno.component";

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
