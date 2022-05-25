import { BusquedaComponent } from './busqueda/busqueda.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { DoctoresComponent } from './mantenimientos/doctores/doctores.component';
import { DoctorComponent } from './mantenimientos/doctores/doctor.component';
import { AdminGuard } from '../guards/admin.guard';




const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
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
        path: "buscar/:termino",
        component: BusquedaComponent,
        data: { titulo: "Busquedas" }
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
      },
      {
        path: "perfil",
        component: PerfilComponent,
        data: { titulo: "Perfil de usuario" }
      },

      //Mnatenimientos
      {
        path: "usuarios",
        canActivate: [AdminGuard],
        component: UsuariosComponent,
        data: { titulo: "Mantenimiento de usuarios" }
      },
      {
        path: "hospitales",
        component: HospitalesComponent,
        data: { titulo: "Mantenimiento de hospitales" }
      },
      {
        path: "doctores",
        component: DoctoresComponent,
        data: { titulo: "Mantenimineto de doctores" }
      },
      {
        path: "doctor/:id",
        component: DoctorComponent,
        data: { titulo: "Mantenimiento de doctores" }
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
