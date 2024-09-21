import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
    declarations: [	
        AppComponent,
   ],
    imports: [
        SharedModule,
        AppRoutingModule,
        MaterialModule,
    ],
    bootstrap: [AppComponent],
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
