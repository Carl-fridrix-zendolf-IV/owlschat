import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { PrivateHttpGetListService, PrivateHttpSearchUserService, PrivateHttpCreateChatService } from './private.service';


@Component({
  selector: 'main-private',
  templateUrl: 'private.component.html',
  styleUrls: ['private.component.scss']
})
export class PrivateComponent {
  public searchUserModel: string;
  public showUsersOverlay: boolean;
  public users: Array<object>;
  public chats: Array<object>;

  constructor (mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private privateHttpGetListService: PrivateHttpGetListService, private privateHttpSearchUserService: PrivateHttpSearchUserService, private privateHttpCreateChatService: PrivateHttpCreateChatService, private router: Router) {
    mdIconRegistry
      .addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ic_search_white_48px.svg'))
      .addSvgIcon('arrow-forward', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ic_arrow_forward_black_48px.svg'));
  }

  ngOnInit () {
    this.privateHttpGetListService.request().subscribe(data => {
      this.chats = data.data;
    }, err => {
      console.error(err);
    });
  }

  searchUser () {
    this.users = null;
    this.privateHttpSearchUserService.request(this.searchUserModel).subscribe(data => {
      console.log(data);

      this.users = data.data;
    }, err => {
      console.log(err);
    });

    this.showUsersOverlay = true;
  }

  closeOverlay () {
    this.showUsersOverlay = false;
  }

  createPrivateChat (user: any) {
    const id = user._id;
    this.privateHttpCreateChatService.request({user_id: id}).subscribe(data => {
      console.log(data);
      this.router.navigate(['private/', data._id]);
    }, err => {
      console.error(err);
    });
  }
}
