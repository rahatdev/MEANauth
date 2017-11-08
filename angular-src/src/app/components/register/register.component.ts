import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

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

  constructor(private _validate: ValidateService) { }

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

    console.log("Registrations Successful!");
    // check if username exists
    // validate if correct email used.
    // post to backend

  }

}
