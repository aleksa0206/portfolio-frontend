import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { authInterceptor } from './core/interceptors/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),    
  ],
};
