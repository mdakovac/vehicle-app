import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginResponse } from '../types/ILoginResponse';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loginUrl: string = 'http://localhost:3000/auth/login';

	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<ILoginResponse> {
		return this.http.post<ILoginResponse>(this.loginUrl, {
			username,
			password,
		});
	}
}
