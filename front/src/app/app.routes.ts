import { Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {RegisterComponent} from "./component/register/register.component";
import {DestinosComponent} from "./component/destinos/destinos.component";
import {SitiosComponent} from "./component/sitios/sitios.component";
import {PlanesComponent} from "./component/planes/planes.component";
import {authGuard} from "./auth.guard";
import {roleGuard} from "./role.guard";
import {EstadisticasComponent} from "./component/estadisticas/estadisticas.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'destinos', component: DestinosComponent, canActivate: [roleGuard]},
  { path: 'sitios', component: SitiosComponent, canActivate: [roleGuard]},
  { path: 'planes', component: PlanesComponent, canActivate: [authGuard]},
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [roleGuard]},
  { path: '**', redirectTo: 'login' },

];
