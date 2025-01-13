import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'overview', loadComponent: () => import('./features/overview/overview.component').then(c => c.OverviewComponent) },
  { path: 'summary/:ticker', loadComponent: () => import('./features/ticker-summary/ticker-summary.component').then(c => c.TickerSummaryComponent) },
  { path: '**', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
