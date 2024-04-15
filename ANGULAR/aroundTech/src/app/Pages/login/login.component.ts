import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/Interfaces/login.interface';
import { UserInterface } from 'src/app/Interfaces/userI.interface';
import { UserService } from 'src/app/Services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // HTML variables
  loginCur !: LoginInterface;
  emailLogin!: string;
  pwdLogin!: string;
  loginAlert: string = "";
  userCur !: UserInterface;

  // TS variables
  private _subUser  !: Subscription;
  

  constructor(private _userService: UserService, private _router: Router) {
  }



  onSubmitConnect = async (formLogin: NgForm) => {

    if (formLogin.valid) {


      let loginObj = new LoginInterface(formLogin.value.emailInput, formLogin.value.pwdInput);

      const response = await this._userService.getOneUser(loginObj);
      console.log(`respon GetOneUser`, response)
      if (response.obj !== null && response.status === 200) {
        this._router.navigateByUrl("home");
      } else {
        this.loginAlert = response.message; 
      }


    } else {
      console.log(`c'est raté`)
      console.log(`form`, formLogin)
      console.log(`form`, formLogin.value)
    }
  }


  ngOnInit(): void {

    this._subUser = this._userService.userCur$.subscribe(user => { this.userCur = user });
    console.log(`onINIT login`, this.userCur)
    if (this.userCur.logged != false){
      this._router.navigateByUrl("home");
    }

    // Test DEV à suppr
    this.loginCur = new LoginInterface("lol@ex.lol", "John");
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }
}
