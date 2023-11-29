import { inject } from "@angular/core";
import { AuthService } from "./service/auth.service";
export const authGuard = (route, state) => {
    const authService = inject(AuthService);
    console.log(authService.tokenDisponible());
    return authService.tokenDisponible();
};
//# sourceMappingURL=auth.guard.js.map