import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { MissionComponent } from './Pages/mission/mission.component';
import { ExpenseGestionComponent } from './Pages/expense-gestion/expense-gestion.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'nature',/*  canActivate: [ ConnexionGuard ] */, component: TododetailComponent },
  // { path: 'liste/:idUser', canActivate: [ ConnexionGuard ], component: TodolstComponent },
  { path: 'missions', component: MissionComponent },/*
  { path: 'missions-in-wait', /*component:/* MissionWaitingComponent  },
  { path: 'planning', /*component:/* PlanningComponent  },
  { path: 'primes', /* component:PrimeComponent,  canActivate: [ ConnexionGuard ]},
  { path: 'motifs', /* component!MotifComponent,  canActivate: [ ConnexionGuard ]  },
  { path: 'natures', /* component:NatureComponent,  canActivate: [ ConnexionGuard ]  }, */
  {
    path: 'expenses',
    children: [
      { path: '',  component:ExpenseGestionComponent },
      /*{ path: ':idMission',  component: ExpenseEditComponent }*/
    ]
  },
  /*{ path: 'users',  component:UserComponent  },
  { path: '/unauthorized', /* component:UnauthorizedComponent  },*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
