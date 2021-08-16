import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { identity, pickBy } from 'lodash';
import { Subscription } from 'rxjs';
import { ConfirmDeleteDialogComponent } from 'src/app/modules/shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { SnackbarService } from 'src/app/modules/shared/services/snackbar.service';
import { VehicleService } from '../../services/vehicle.service';
import { IVehicle } from '../../types/IVehicle';
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
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private snackbarService: SnackbarService
	) {}

	ngOnInit(): void {
		this.fetchByQueryParams();
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

	onDelete(vehicle: IVehicle): void {
		this.dialog.open(ConfirmDeleteDialogComponent, {
			data: {
				resourceId: vehicle._id,
				description: `${vehicle.make} - ${vehicle.model} - ${vehicle.year}`,
				onConfirm: this.delete(this),
			},
		});
	}

	private fetchByQueryParams(): void {
		const { page, rpp, query } = this.route.snapshot.queryParams;
		this.find(query, page, rpp);
	}

	private find(query: string = '', page: number = 1, rpp: number = 10): void {
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

	private delete =
		(context: VehicleListComponent) =>
		(vehicleId: string): void => {
			context.vehicleService.delete(vehicleId).subscribe({
				next: () => {
					context.fetchByQueryParams();
					context.snackbarService.success(
						'Resource deleted successfully.'
					);
					context.dialog.closeAll();
				},
				error: (err: any) => {
					console.log(err);
					context.snackbarService.error('Resource delete failed');
					context.dialog.closeAll();
				},
			});
		};
}
