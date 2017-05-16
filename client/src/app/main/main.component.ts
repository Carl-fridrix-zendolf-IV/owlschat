import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginHttpTokenValidateService } from '../login/login.service';
import { Tabs } from '../../typings.d';


@Component({
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent {
  public tabs: Array<Tabs>;
  public user: any;

  constructor (private router: Router, private loginHttpTokenValidateService: LoginHttpTokenValidateService) {
    const child = location.pathname.split('/').pop();
    this.tabs = [
      {
        name: 'Rooms',
        selected: child === 'rooms',
        link: '/main/rooms'
      },
      {
        name: 'Private',
        selected: child === 'private',
        link: '/main/private'
      }
    ];

    // if user unauthorized return them to login page
    if (!AppComponent.TOKEN) {
      this.router.navigate(['']);
    }
  }

  ngOnInit () {
    if (!AppComponent.USER) {
      this.loginHttpTokenValidateService.request().subscribe(data => {
        AppComponent.USER = data.data;
        this.user = AppComponent.USER;
      }, err => {console.log(err)});
    } else {
      this.user = AppComponent.USER;
    }
  }

  selectTab (tab: Tabs) :boolean {
    this.tabs.forEach(item => {return item.selected = false;});
    return tab.selected = true;
  }
}
