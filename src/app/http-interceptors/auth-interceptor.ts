import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from '../modules/auth/services/token-storage.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private tokenStorageService: TokenStorageService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let modifiedReq = req;
		const authToken: string | null = this.tokenStorageService.getToken();
		if (authToken) {
			modifiedReq = req.clone({
				headers: req.headers.set(
					'Authorization',
					`Bearer ${authToken}`
				),
			});
		}

		return next.handle(modifiedReq);
	}
}
