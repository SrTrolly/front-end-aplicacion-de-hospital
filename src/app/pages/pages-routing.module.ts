import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { NopagefoundComponent } from "../nopagefound/nopagefound.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';




const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: { titulo: "Dashboard" }
      },
      {
        path: "grafica1",
        component: Grafica1Component,
        data: { titulo: "Grafica #1" }
      },
      {
        path: "progress",
        component: ProgressComponent,
        data: { titulo: "ProgressBar" }
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes de cuenta" }
      },
      {
        path: "promesas",
        component: PromesasComponent,
        data: { titulo: "Promesas" }
      },
      {
        path: "rxjs",
        component: RjxsComponent,
        data: { titulo: "RxJs" }
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
