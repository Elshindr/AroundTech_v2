import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/Interfaces/userI.interface';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //HTML variable
  @Input()  userCur!: UserInterface;

  constructor(private _userService: UserService,  private _router: Router) {
  }

  ngOnInit(): void {
    console.log(`userCur header`,this.userCur)
   // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }
  handleLogout() {
    console.log(`se deconnecter`)
  }
}
