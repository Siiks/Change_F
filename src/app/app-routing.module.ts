import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { MisPeticionesComponent } from './mis-peticiones/mis-peticiones.component';
import { PeticionesComponent } from './peticiones/peticiones.component';


const routes: Routes = [
  { path: '', redirectTo: '/peticiones', pathMatch: 'full'},
  { path: 'peticiones', component: PeticionesComponent, pathMatch: 'full'},
  { path: 'misPeticiones/:idUsuario', component: MisPeticionesComponent, pathMatch: 'full'},
  { path: 'login', component: HeaderLayoutComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }
