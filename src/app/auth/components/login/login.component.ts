import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

	error: string = 'Invalid credentials';

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.authService
			.login(this.loginForm.value.username, this.loginForm.value.password)
			.subscribe({
				next: (x) => console.log('Observer got a next value: ' + x),
				error: (err) => console.error('Observer got an error: ' + err),
				complete: () =>
					console.log('Observer got a complete notification'),
			});
	}

	private redirectToVehicleList(): void {
		this.router.navigate(['/vehicles']);
	}
}
