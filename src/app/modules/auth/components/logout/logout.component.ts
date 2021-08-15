import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
	constructor(
		private tokenStorageService: TokenStorageService,
		private router: Router
	) {}

	ngOnInit(): void {}

	logout(): void {
		this.tokenStorageService.signOut();
		this.router.navigate(['/login']);
	}
}
