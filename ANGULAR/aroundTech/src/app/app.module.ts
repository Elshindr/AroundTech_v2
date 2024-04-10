import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, Validators } from '@angular/forms';



import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './Components/root/root.component';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { UnauthorizedComponent } from './Pages/unauthorized/unauthorized.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MissionComponent } from './Pages/mission/mission.component';
import { ExpenseGestionComponent } from './Pages/expense-gestion/expense-gestion.component';
//import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    UnauthorizedComponent,
    FooterComponent,
    MissionComponent,
    ExpenseGestionComponent,
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
