import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../app.component';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


/*
* Validate user token
* */
@Injectable()
export class LoginHttpTokenValidateService {
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

    return this.http.get(this.url + '/api/public/v1/user/validate', options)
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
* Auth already registered users
* */
@Injectable()
export class LoginHttpAuthService {
  private url: string = AppComponent.API;

  constructor (private http?: Http) {}

  request (body) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');

    const options = new RequestOptions({
      headers: header
    });

    return this.http.post(this.url + '/api/public/v1/user/auth', body, options)
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
* Create new user. Anonim or regular
* */
@Injectable()
export class LoginHttpNewUserService {
  private url: string = AppComponent.API;

  constructor (private http?: Http) {}

  request (body) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');

    const options = new RequestOptions({
      headers: header
    });

    return this.http.put(this.url + '/api/public/v1/user/init', body, options)
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
