import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'overview', loadComponent: () => import('./overview/overview.component').then(c => c.OverviewComponent) },
  { path: '**', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
