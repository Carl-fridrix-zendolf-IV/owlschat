import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry, MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AppComponent} from '../../app.component';
import { DetailHttpCreateMessageService } from './detail.service';
import { RoomsHttpLeaveRoomService } from '../rooms/rooms.service';
import { LoginHttpTokenValidateService } from '../../login/login.service';
declare var io: any;


@Component({
  selector: 'app-rooms-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.scss']
})
export class DetailComponent {
  @ViewChild('main') el:ElementRef;

  private user = AppComponent.USER;
  public roomId: string;
  public users: Array<object>;
  public messages: Array<object> = [];
  public messageModel: string;
  public socket: any;

  constructor (mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, public snackBar: MdSnackBar, private detailHttpCreateMessageService: DetailHttpCreateMessageService, private loginHttpTokenValidateService: LoginHttpTokenValidateService, private roomsHttpLeaveRoomService: RoomsHttpLeaveRoomService) {
    mdIconRegistry
      .addSvgIcon('send', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/ic_send_white_48px.svg'));
  }

  ngOnInit () {
    if (!this.user)
      return this.router.navigate(['main', 'rooms']);

    this.route.params.subscribe((params: Params) => {
      this.roomId = params.id;
      this.connectToSocket();
    });
  }

  ngOnDestroy () {
    if (this.socket)
      this.socket.close();

    if (this.user)
      this.roomsHttpLeaveRoomService.request({room_id: this.roomId, user_id: this.user._id}).subscribe(data => {
        console.log(data)
      }, err => console.error(err));
  }

  newSnackBar (message: string) {
    this.snackBar.open(message, 'Undo', {
      duration: 5000,
    });
  }

  scrollToBottom () {
    setTimeout(() => {
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    });
  }

  createMessage () {
    const message = {
      message: this.messageModel,
      chat_id: this.roomId.toString()
    };

    this.detailHttpCreateMessageService.request(message).subscribe(data => {
      this.messageModel = null;
    });
  }

  handleMessageSender (message) {
    if (message.sender_id === this.user._id)
      return 'right';
    else
      return 'left';
  }

  connectToSocket () {
    this.socket = io(AppComponent.API, {query: `chat=${this.roomId}`});

    this.socket.on('USER_JOIN', data => {
      this.newSnackBar(`user ${data.name} joined to this room`);
    });

    this.socket.on('USER_LEAVE', data => {
      this.newSnackBar(`User ${data.name} leaved this room`);
    });

    this.socket.on('NEW_MESSAGE', data => {
      this.messages.push(data);
      this.scrollToBottom();
    });

    this.socket.on('MESSAGES_LIST', data => {
      this.messages = data;
      this.scrollToBottom();
    });

    this.socket.on('connect', () => {
      console.info(`Open socket connection with server at ${new Date()}`);
    });

    this.socket.on('disconnect', () => {
      console.info(`Connection with socket.io server lost at ${new Date()}`);
    });
  }
}
