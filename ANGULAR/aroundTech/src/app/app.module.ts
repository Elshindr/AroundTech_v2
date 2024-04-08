import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, Validators } from '@angular/forms';



import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './Components/root/root.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
//import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [
  //  MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
