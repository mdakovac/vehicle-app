import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILoginResponse } from '../types/ILoginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loginUrl: string = `${environment.apiUrl}/auth/login`;

	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<ILoginResponse> {
		return this.http.post<ILoginResponse>(this.loginUrl, {
			username,
			password,
		});
	}
}
