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
  MdCardModule
} from '@angular/material';

import {
  LoginHttpTokenValidateService,
  LoginHttpAuthService,
  LoginHttpNewUserService,
} from './login/login.service';

import {
  RoomsHttpGetListService,
  RoomsHttpCreateRoomService
} from './main/rooms/rooms.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RoomsComponent } from './main/rooms/rooms.component';
import { PrivateComponent } from './main/private/private.component';

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
        path: 'private',
        component: PrivateComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RoomsComponent,
    PrivateComponent
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
    MdCardModule
  ],
  providers: [LoginHttpTokenValidateService, LoginHttpAuthService, LoginHttpNewUserService, RoomsHttpGetListService, RoomsHttpCreateRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
