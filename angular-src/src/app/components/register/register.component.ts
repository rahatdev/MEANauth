import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  name : String;
  username: String;
  email: String;
  password: String;
  emailMessage: String = "We'll never share your email with anyone else.";

  constructor(
    private _validate: ValidateService,
    private _auth: AuthService
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    // create user
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    
    if (!this._validate.validateRegister(user)) {
      console.log("Please complete all fields.");
      return;
    }

    if(!this._validate.validateEmail(user.email)){
      this.emailMessage = "Please enter a valid email.";
      return;
    }

    this._auth.registerUser(user).subscribe( data => {
      if(data.success){
        console.log(data.msg);
      } else {
        console.log(data.msg);
      }
    });
    // check if username exists
    // password strength requirements
    // post to backend

  }

}
