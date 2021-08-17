import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { ILoginResponse } from '../../types/ILoginResponse';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup = new FormGroup({
		username: new FormControl(),
		password: new FormControl(),
	});

	error: string = '';
	submitting: boolean = false;

	constructor(
		private authService: AuthService,
		private tokenStorageService: TokenStorageService,
		private router: Router
	) {}

	ngOnInit(): void {
		if (this.tokenStorageService.getToken()) {
			this.router.navigate(['/vehicle']);
		}
		this.loginForm.valueChanges.subscribe(() => {
			this.error = '';
		});
	}

	onSubmit(): void {
		this.submitting = true;

		this.authService
			.login(this.loginForm.value.username, this.loginForm.value.password)
			.subscribe({
				next: (response: ILoginResponse) => {
					this.tokenStorageService.saveToken(response.token);
					this.router.navigate(['/vehicle']);
				},
				error: () => {
					this.loginForm.patchValue({ password: null });
					this.error = 'Invalid credentials';
				},
				complete: () => {
					this.submitting = false;
				},
			});
	}
}
