import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../app.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
 * Get list of rooms
 * */
@Injectable()
export class RoomsHttpGetListService {
  private url: string = AppComponent.API;
  private token: string = AppComponent.TOKEN;

  constructor (private http?: Http) {}

  request () {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.token);

    const options = new RequestOptions({
      headers: header
    });

    return this.http.get(this.url + '/api/public/v1/room/list', options)
      .map(this.successHandler)
      .catch(this.errorHandler);
  }

  successHandler (res: Response) {
    const data = res.json();
    return data;
  }

  errorHandler (error: Response | any) {
    const message = `${error.status} - ${error.statusText || ''}`;
    console.error(message);

    return Observable.throw(message);
  }
}


/*
* Create room
* */
@Injectable()
export class RoomsHttpCreateRoomService {
  private url: string = AppComponent.API;
  private token: string = AppComponent.TOKEN;

  constructor (private http?: Http) {}

  request (body) {
    // body must have name and online_list array

    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.token);

    const options = new RequestOptions({
      headers: header
    });

    return this.http.put(this.url + '/api/public/v1/room/create', body, options)
      .map(this.successHandler)
      .catch(this.errorHandler);
  }

  successHandler (res: Response) {
    const data = res.json();
    return data;
  }

  errorHandler (error: Response | any) {
    const message = `${error.status} - ${error.statusText || ''}`;
    console.error(message);

    return Observable.throw(message);
  }
}
