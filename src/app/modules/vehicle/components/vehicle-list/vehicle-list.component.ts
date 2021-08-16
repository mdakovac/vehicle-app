import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { identity, pickBy } from 'lodash';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../services/vehicle.service';
import { IVehicleFindResponse } from '../../types/IVehicleFindResponse';
@Component({
	selector: 'app-vehicle-list',
	templateUrl: './vehicle-list.component.html',
	styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
	data: IVehicleFindResponse = {
		items: [],
		page: 1,
		rpp: 10,
		query: '',
		total: 0,
	};

	displayedColumns: string[] = ['make', 'model', 'year', 'delete'];

	filterInputValue: string = this.route.snapshot.queryParams.query;

	// MatPaginator Output
	pageEvent?: PageEvent;

	private fetchSubscription?: Subscription;

	constructor(
		private vehicleService: VehicleService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const { page, rpp, query } = this.route.snapshot.queryParams;
		this.find(query, page, rpp);
	}

	ngAfterViewInit(): void {
		this.pageEvent;
	}

	onPaginatorChange(event: PageEvent): PageEvent {
		this.fetchSubscription!.unsubscribe(); // cancel current fetch
		this.find(this.data.query, event.pageIndex + 1, event.pageSize);
		return event;
	}

	onFilter(): void {
		this.fetchSubscription!.unsubscribe(); // cancel current fetch
		this.find(this.filterInputValue, 1, this.data.rpp);
	}

	find(query: string = '', page: number = 1, rpp: number = 10): void {
		this.fetchSubscription = this.vehicleService
			.find(query, page, rpp)
			.subscribe({
				next: (response: IVehicleFindResponse) => {
					const { page, ...other } = response;
					this.data = {
						page: page - 1,
						...other,
					};

					this.router.navigate(['.'], {
						relativeTo: this.route,
						queryParams: pickBy({ query, page, rpp }, identity),
					});
				},
				error: (err) => {
					console.log(err);
				},
			});
	}
}
