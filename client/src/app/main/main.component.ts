import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../app.component';
import { Tabs } from '../../typings.d';


@Component({
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent {
  public tabs: Array<Tabs>;

  constructor (private router: Router) {
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
    // if (!AppComponent.TOKEN) {
    //   this.router.navigate(['']);
    // }
  }

  selectTab (tab: Tabs) :boolean {
    this.tabs.forEach(item => {return item.selected = false;});
    return tab.selected = true;
  }
}
