import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginHttpTokenValidateService, LoginHttpAuthService, LoginHttpNewUserService } from './login.service';


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  public formType: string;
  public buttonString: string;
  public username: string;
  public loginUserObject: any = {};
  public showSpinner: boolean;
  public error: string;

  constructor (private router: Router, private loginHttpTokenValidateService: LoginHttpTokenValidateService, private loginHttpAuthService: LoginHttpAuthService, private loginHttpNewUserService: LoginHttpNewUserService) {}

  ngOnInit () {
    if (AppComponent.TOKEN) {
      this.showSpinner = true;

      this.loginHttpTokenValidateService.request().subscribe(data => {
        if (data.code > 20000) {return this.error = data.message;}

        AppComponent.USER = data.data; // save user to global property

        this.username = data.data.name;
        this.buttonString = 'Continue'; // change continue string

        this.showSpinner = false; // hide spinner
        this.formType = 'USER_ANONIM';
      }, err => {
        console.error(err);
      });
    } else {
      this.showSpinner = false;
      this.formType = 'NEW_USER_ANONIM';
      this.buttonString = 'Continue';
    }
  }

  toggleAnotherFormType (type: string): void {
    this.loginUserObject = {};
    this.error = null;

    if (type === 'login') {
      this.formType = 'ALREADY_REGISTERED';
      this.buttonString = 'Login';
    } else if (type === 'signUp') {
      this.formType = 'NEW_USER';
      this.buttonString = 'Sign Up';
    }
  }

  createNewUser (anonim: boolean): void {
    let body = this.loginUserObject;
    body.anonymous = anonim;

    this.loginHttpNewUserService.request(body).subscribe(data => {
      if (data.code > 20000) {return this.error = data.message;}

      localStorage.setItem('OWLSCHAT_TOKEN', data.data.token);

      AppComponent.TOKEN = data.data.token;
      AppComponent.USER = data.data;

      return this.router.navigate(['main', 'rooms']);
    }, err => {
      console.error(err);
    });
  }

  authAlreadyRegistered (): void {
    let body = this.loginUserObject;

    this.loginHttpAuthService.request(body).subscribe(data => {
      if (data.code > 20000) {return this.error = data.message;}

      localStorage.setItem('OWLSCHAT_TOKEN', data.data.token);

      AppComponent.TOKEN = data.data.token;
      AppComponent.USER = data.data;

      return this.router.navigate(['main', 'rooms']);
    }, err => {
      console.error(err);
    });
  }

  submit (): any {
    switch (this.formType) {
      case 'USER_ANONIM':
        this.router.navigate(['main', 'rooms']);
        break;
      case 'ALREADY_REGISTERED':
        this.authAlreadyRegistered();
        break;
      case 'NEW_USER':
        this.createNewUser(false);
        break;
      case 'NEW_USER_ANONIM':
        this.createNewUser(true);
        break;
    }
  }

  cancel () {
    this.loginUserObject = {};
    this.error = null;
    this.username = null;

    AppComponent.USER = null;
    AppComponent.TOKEN = null;

    localStorage.removeItem('OWLSCHAT_TOKEN');

    if (this.formType == 'USER_ANONIM')
      this.formType = 'NEW_USER_ANONIM';
  }
}
