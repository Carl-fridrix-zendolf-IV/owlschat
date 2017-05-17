import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdInputModule,
  MdButtonModule,
  MdListModule,
  MdToolbarModule,
  MdTabsModule,
  MdIconModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdChipsModule,
  MdCardModule,
  MdSnackBarModule
} from '@angular/material';

import {
  LoginHttpTokenValidateService,
  LoginHttpAuthService,
  LoginHttpNewUserService,
} from './login/login.service';

import {
  RoomsHttpGetListService,
  RoomsHttpCreateRoomService,
  RoomsHttpJoinToRoomService,
  RoomsHttpLeaveRoomService
} from './main/rooms/rooms.service';

import {
  PrivateHttpGetListService,
  PrivateHttpSearchUserService,
  PrivateHttpCreateChatService
} from './main/private/private.service';

import { DetailHttpCreateMessageService } from './main/detail/detail.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RoomsComponent } from './main/rooms/rooms.component';
import { PrivateComponent } from './main/private/private.component';
import { DetailComponent } from './main/detail/detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'rooms',
        component: RoomsComponent
      },
      {
        path: 'rooms/:id',
        component: DetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'private',
        component: PrivateComponent
      },
      {
        path: 'private/:id',
        component: DetailComponent,
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RoomsComponent,
    PrivateComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    // Angular material imports
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdToolbarModule,
    MdTabsModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdChipsModule,
    MdCardModule,
    MdSnackBarModule
  ],
  providers: [
    LoginHttpTokenValidateService,
    LoginHttpAuthService,
    LoginHttpNewUserService,
    RoomsHttpGetListService,
    RoomsHttpCreateRoomService,
    PrivateHttpGetListService,
    PrivateHttpSearchUserService,
    PrivateHttpCreateChatService,
    DetailHttpCreateMessageService,
    RoomsHttpJoinToRoomService,
    RoomsHttpLeaveRoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
