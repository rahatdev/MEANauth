import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }

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

  storeUserData(token, user) {
    if (token != undefined && user != undefined){
      //Save to local storage
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user)) //should certain items be stored this way? userid?

      //Save local variables
      this.authToken = token;
      const newUser = {
        id: user.id,
        name : user.name,
        username: user.username,
        email: user.email
      }
      this.user = newUser;
    } 
  }

}
