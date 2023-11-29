import { Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "./service/auth.service";
export const roleGuard = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.tokenDisponible()) {
        return authService.hasRole("ADMIN");
    }
    else
        router.navigate(['/login']);
    return false;
};
//# sourceMappingURL=role.guard.js.map