import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../app.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
 * Get list of private chats
 * */
@Injectable()
export class PrivateHttpGetListService {
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


    return this.http.get(this.url + '/api/public/v1/private/list', options)
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
 * Get list of private chats
 * */
@Injectable()
export class PrivateHttpSearchUserService {
  private url: string = AppComponent.API;
  private token: string = AppComponent.TOKEN;

  constructor (private http?: Http) {}

  request (searchText: string) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.token);

    const params = new URLSearchParams();
    params.append('name', searchText);

    const options = new RequestOptions({
      headers: header,
      params: params
    });

    return this.http.get(this.url + '/api/public/v1/user/list', options)
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
 * Get list of private chats
 * */
@Injectable()
export class PrivateHttpCreateChatService {
  private url: string = AppComponent.API;
  private token: string = AppComponent.TOKEN;

  constructor (private http?: Http) {}

  request (body) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', this.token);

    const options = new RequestOptions({
      headers: header,
    });

    return this.http.put(this.url + '/api/public/v1/private/create', body, options)
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
