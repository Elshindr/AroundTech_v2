import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Interfaces/userInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  constructor(/* (private _loginService: LoginService,  */private _router: Router) {

    this.userCur = {
      id: 1,
      email: "michel.test@TestBed.fr",
      lastname: " elshindr",
      firstname: " haedy",
      idManager: 3,
      idRole: 3,
      logged: true
    }
    
  }

  userCur !: UserInterface;


  ngOnInit(): void {
    //throw new Error('Method not implemented.');

    console.log(`userCur home`,this.userCur)
    if (this.userCur === null || this.userCur === undefined) {
      throw new Error("Utilisateur non trouvé");

    }
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

}
