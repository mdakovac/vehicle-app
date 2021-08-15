import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService implements CanActivateChild {
	constructor(
		public tokenStorageService: TokenStorageService,
		public router: Router
	) {}

	canActivateChild(): boolean {
		// if no token, redirect to login
		if (!this.tokenStorageService.getToken()) {
			this.router.navigate(['login']);
			return false;
		}
		return true;
	}
}
