import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { PeticionesComponent } from './peticiones/peticiones.component';


const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full'},
  { path: 'peticiones', component: PeticionesComponent, pathMatch: 'full'},
  { path: 'login', component: HeaderLayoutComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }
