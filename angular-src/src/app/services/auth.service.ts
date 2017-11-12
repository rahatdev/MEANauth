import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  private _api: string = 'http://localhost:3000/users';

  constructor( private _http: Http ) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }



  getUser(){
    //let token = localStorage.getItem('id_token');
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this._http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(res => res.json());
  }



  storeUserData(token, user) {
    if (token != undefined && user != undefined){
      //Save to local storage
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user)) //should certain items be stored this way? userid?

      //Save local variables
      this.authToken = token;
      this.user = user;
    } 
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  
  isLoggedIn(){
    return tokenNotExpired();
  }

  // getUser(){
  //   let user = localStorage.getItem('user');
  //   return user;
  // }
}
