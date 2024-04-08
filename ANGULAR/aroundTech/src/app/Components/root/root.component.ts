import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/Interfaces/userInterface';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['root.component.html']
})
export class RootComponent implements OnInit, OnDestroy {

  private _subUser !: Subscription;

  userCur !: UserInterface;

  constructor(private _UserService: UserService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this._subUser = this._UserService.userCur$.subscribe(user => {
      this.userCur = user;
    });

  }

  ngOnDestroy(): void {

    this._subUser.unsubscribe();
  }

}
