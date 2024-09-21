import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    OverviewComponent,
  ]
})
export class OverviewModule { }
