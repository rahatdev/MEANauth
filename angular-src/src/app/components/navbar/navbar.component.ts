import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _flashMessage: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this._auth.logout();
    this._flashMessage.show('Logged out.', { cssClass: 'alert-success', timeout: 3000});
    this._router.navigate(['/login']);
    return false;
  }

}
