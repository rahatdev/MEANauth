import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _auth: AuthService,
        private _router: Router
    ) { }

    canActivate(){
        //console.log('canActivate entered.');
        if (this._auth.isLoggedIn()) {
            //console.log('can activate is true');
            return true;
        } else {
            //console.log('can activate is false');
            this._router.navigate(['/login']);
            return false;
        }
    }

}