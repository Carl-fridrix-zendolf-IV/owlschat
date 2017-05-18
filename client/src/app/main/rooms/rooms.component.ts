import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { RoomsHttpGetListService, RoomsHttpCreateRoomService, RoomsHttpJoinToRoomService } from './rooms.service';
import {AppComponent} from "../../app.component";


@Component({
  selector: 'main-rooms',
  templateUrl: 'rooms.component.html',
  styleUrls: ['rooms.component.scss']
})
export class RoomsComponent {
  public showCreateRoomOverlay: boolean;
  public roomName: string;
  public loading: boolean;
  public roomsList: Array<object>;

  constructor (mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private roomsHttpGetListService: RoomsHttpGetListService, public roomsHttpCreateRoomService: RoomsHttpCreateRoomService, private roomsHttpJoinToRoomService: RoomsHttpJoinToRoomService) {
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

  joinRoom (room: string) {
    const data = {
      room_id: room,
      user_id: AppComponent.USER._id
    };

    this.roomsHttpJoinToRoomService.request(data).subscribe(data => {
      console.log(data);
    }, err => {
      console.error(err);
    })
  }
}
