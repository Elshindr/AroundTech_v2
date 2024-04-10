import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/Interfaces/userI.interface';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  // TS variables
  private _subUser !: Subscription;

  // HTML variables
  userCur !: UserInterface;

  constructor(private _userService: UserService,  private _router: Router) {
  }




  ngOnInit(): void {

    this._subUser = this._userService.userCur$.subscribe( user => this.userCur = user);

    console.log(`userCur home`,this.userCur)
    if (this.userCur.logged === false) {
      //this._router.navigateByUrl("/login");
      throw new Error("Utilisateur non trouvé");
    }
  }


  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }

}
