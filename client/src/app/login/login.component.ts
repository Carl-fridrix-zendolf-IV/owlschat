import { Component } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  public formType: string;
  public buttonString: string;

  constructor () {
    if (AppComponent.USER) {
      this.formType = null;
      this.buttonString = 'Continue as ${AppComponent.USER.name}';
    } else {
      this.formType = 'NEW_USER_ANONIM';
      this.buttonString = 'Continue';
    }
  }

  toggleAnotherFormType (type: string) :void {
    if (type == 'login') {
      this.formType = 'ALREADY_REGISTERED';
      this.buttonString = 'Login';
    }
    else if (type == 'signUp') {
      this.formType = 'NEW_USER';
      this.buttonString = 'Sign Up';
    }
  }
}
