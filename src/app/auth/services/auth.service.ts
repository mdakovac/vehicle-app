import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loginUrl: string = 'http://localhost:3000/auth/login';
	private httpOptions: object = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};

	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<Object> {
		return this.http.post(
			this.loginUrl,
			{
				username,
				password,
			},
			this.httpOptions
		);
	}
}
