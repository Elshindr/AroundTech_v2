import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/Interfaces/userI.interface';
import { UserService } from 'src/app/Services/user.service';
import { tap, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['root.component.html']
})
export class RootComponent implements OnInit, OnDestroy {

  // TS variables
  private _subUser!: Subscription;

  // HTML variables
  userCur!: UserInterface;
  showElm: boolean = false;

  constructor(private _UserService: UserService, private _route: ActivatedRoute, private router: Router) {
  }



  ngOnInit(): void {
    
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log(`eventINIT ROOT `, event)
      if (event.url !== '/login' || event.urlAfterRedirects !=="/login") {
        this.showElm = true;
      } else {
        this.showElm = false;
      }
    });


    this._subUser = this._UserService.userCur$.subscribe(user => {
      this.userCur = user;
    });
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }

}
