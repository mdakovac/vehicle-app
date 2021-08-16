import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVehicle } from '../types/IVehicle';
import { IVehicleFindResponse } from '../types/IVehicleFindResponse';

@Injectable({
	providedIn: 'root',
})
export class VehicleService {
	private baseUrl: string = 'http://localhost:3000/vehicle';

	constructor(private http: HttpClient) {}

	find(
		query: string = '',
		page: number = 1,
		rpp: number = 10
	): Observable<IVehicleFindResponse> {
		let params = new HttpParams().append('page', page).append('rpp', rpp);

		if (query) {
			params = params.append('query', query);
		}

		return this.http.get<IVehicleFindResponse>(this.baseUrl, {
			params,
		});
	}

	create(make: string, model: string, year: number): Observable<IVehicle> {
		return this.http.post<IVehicle>(this.baseUrl, {
			make,
			model,
			year,
		});
	}

	delete(id: string) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}
}
