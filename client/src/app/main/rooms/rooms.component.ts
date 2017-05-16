import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { RoomsHttpGetListService, RoomsHttpCreateRoomService } from './rooms.service';
import {AppComponent} from "../../app.component";


@Component({
  selector: 'main-rooms',
  templateUrl: 'rooms.component.html',
  styleUrls: ['rooms.component.scss']
})
export class RoomsComponent {
  private showCreateRoomOverlay: boolean;
  private roomName: string;
  private loading: boolean;
  private roomsList: Array<object>;

  constructor (mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private roomsHttpGetListService: RoomsHttpGetListService, public roomsHttpCreateRoomService: RoomsHttpCreateRoomService) {
    mdIconRegistry
      .addSvgIcon('arrow-back', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ic_arrow_back_white_48px.svg'))
      .addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ic_add_white_48px.svg'))
      .addSvgIcon('arrow-forward', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ic_arrow_forward_black_48px.svg'));
  }

  ngOnInit () {
    this.loadRoomsList();
  }

  showOverlay () {
    this.showCreateRoomOverlay = true;
  }

  loadRoomsList () {
    this.loading = true;
    this.roomsList = null;

    this.roomsHttpGetListService.request().subscribe(data => {
      console.log(data);
      this.loading = false;
      this.roomsList = data.data;
    }, err => {
      console.error(err);
    });
  }

  createRoom () {
    const user = AppComponent.USER;
    const data = {name: this.roomName, users: [user._id]};

    this.roomsHttpCreateRoomService.request(data).subscribe(() => {
      this.showCreateRoomOverlay = false;
      this.loadRoomsList();
    }, err => {
      console.error(err)
    });
  }

  cancelCreateRoom () {
    this.showCreateRoomOverlay = false;
  }
}
