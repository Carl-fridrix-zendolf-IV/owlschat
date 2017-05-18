import { Component } from '@angular/core';
import { User } from '../typings';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static USER: User;
  public static TOKEN: string;
  public static API: string;

  constructor () {
    // AppComponent.API = 'http://localhost:3000';
    AppComponent.API = 'https://owlschat.herokuapp.com';

    if (localStorage.getItem('OWLSCHAT_TOKEN')) {
      AppComponent.TOKEN = localStorage.getItem('OWLSCHAT_TOKEN');
    }
  }
}
