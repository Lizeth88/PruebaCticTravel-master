import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "./service/auth.service";



export const roleGuard: CanActivateFn = (route, state) => {
    const authService =  inject(AuthService);
    const router =  inject(Router);
    if (authService.tokenDisponible()){
        return authService.hasRole("ADMIN");
    }else
        console.log("redirect")
        router.navigate(['/login']);
        return false;
};
