import { Component } from '@angular/core';
import { User } from '../typings.d';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static USER: User;
  public static TOKEN: string;

  constructor () {
    if (localStorage.getItem('OWLSCHAT_USER')) {
      AppComponent.USER = JSON.parse(localStorage.getItem('OWLSCHAT_USER'));
      AppComponent.TOKEN = localStorage.getItem('OWLSCHAT_TOKEN');
    }
  }
}
