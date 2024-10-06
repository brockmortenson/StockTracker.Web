import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { interceptorProviders } from './app/shared/utilities/shared-imports';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule),
        provideHttpClient(withInterceptors([...interceptorProviders])),
        provideAnimations(),
        provideCharts(withDefaultRegisterables()),
    ]
})
  .catch(err => console.error(err));
