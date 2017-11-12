import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor( private _auth: AuthService) { }

  ngOnInit() {
    this._auth.getUser().subscribe(data => {
      this.user = data.user;
      console.log(this.user);

    });
  }

}
