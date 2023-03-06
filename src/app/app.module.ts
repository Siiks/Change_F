import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterLayoutComponent } from './layout/footer-layout/footer-layout.component';
import { HeaderLayoutComponent } from './layout/header-layout/header-layout.component';
import { AuthService } from './services/auth.service';
import { PeticionService } from './services/peticion.service';
import { HomeComponent } from './home/home.component';
import { PeticionesComponent } from './peticiones/peticiones.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    FooterLayoutComponent,
    HomeComponent,
    PeticionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    PeticionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
