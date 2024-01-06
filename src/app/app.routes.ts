import { Routes } from '@angular/router';
import { AplicacionCitaComponent } from './componentes/aplicacion-cita/aplicacion-cita.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfiguracionPage } from './paginas/configuracion/configuracion.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)},
    {path: 'aplicacion-cita', component: AplicacionCitaComponent},

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'configuracion',
    component: ConfiguracionPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
