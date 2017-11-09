import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  emailMessage: String = "We'll never share your email with anyone else.";

  constructor(
    private _flashMessage: FlashMessagesService,
    private _validate: ValidateService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    // create user
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if (!this._validate.validateRegister(user)) {
      this._flashMessage.show("Please complete all fields.", { cssClass: 'alert-danger', timeout: 3000 });
      return;
    }

    if (!this._validate.validateEmail(user.email)) {
      const msg = "Please enter a valid email.";
      this.emailMessage = msg;
      this._flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 3000 })
      return;
    }

    this._auth.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 })
        this._router.navigate(['/login']);
      } else {
        this._flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 })
      }
    });
    // check if username exists
    // password strength requirements
    // post to backend

  }

}
