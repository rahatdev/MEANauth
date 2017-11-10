import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor( 
    private _flashMessage: FlashMessagesService,
    private _auth: AuthService,
    private _router: Router
  ){ }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this._auth.authenticateUser(user).subscribe(data => {
      //console.log(data);
      if(data.success){
        this._auth.storeUserData(data.token, data.user);
        this._flashMessage.show('You are now logged in.', {cssClass: 'alert-success', timeout: 3000})
        this._router.navigate(['/profile']);
      } else {
        this._flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000})
      }
    })
  }

}
