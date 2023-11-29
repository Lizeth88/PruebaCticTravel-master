import { LoginComponent } from "./component/login/login.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { RegisterComponent } from "./component/register/register.component";
import { DestinosComponent } from "./component/destinos/destinos.component";
import { SitiosComponent } from "./component/sitios/sitios.component";
import { PlanesComponent } from "./component/planes/planes.component";
import { authGuard } from "./auth.guard";
import { roleGuard } from "./role.guard";
export const routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard] },
    { path: 'destinos', component: DestinosComponent, canActivate: [authGuard] },
    { path: 'sitios', component: SitiosComponent, canActivate: [authGuard] },
    { path: 'planes', component: PlanesComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' },
];
//# sourceMappingURL=app.routes.js.map