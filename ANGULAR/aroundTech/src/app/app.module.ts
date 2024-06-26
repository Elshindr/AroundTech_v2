import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';



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
import { ModalWindowComponent } from './Components/Modals/modal-window/modal-window.component';
import { ModalMissionEditComponent } from './Components/Modals/modal-mission-edit/modal-mission-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalMissionDeleteComponent } from './Components/Modals/modal-mission-delete/modal-mission-delete.component';
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
    ModalWindowComponent,
    ModalMissionEditComponent,
    ModalMissionDeleteComponent,
  ],
  imports: [
  //  MatIconModule,
  //FormGroupDirective,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
