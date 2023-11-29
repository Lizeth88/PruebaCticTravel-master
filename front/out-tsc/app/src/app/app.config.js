import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from "./service/auth.interceptor";
export const appConfig = {
    providers: [provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideAnimations()]
};
//# sourceMappingURL=app.config.js.map