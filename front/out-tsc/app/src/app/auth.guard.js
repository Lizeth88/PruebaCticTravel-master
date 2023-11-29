import { Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "./service/auth.service";
export const authGuard = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.tokenDisponible()) {
        return authService.tokenDisponible();
    }
    else {
        console.log("redirect");
        router.navigate(['/login']);
        return false;
    }
};
//# sourceMappingURL=auth.guard.js.map