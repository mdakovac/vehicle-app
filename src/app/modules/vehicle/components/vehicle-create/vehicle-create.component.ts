import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';

@Component({
	selector: 'app-vehicle-create',
	templateUrl: './vehicle-create.component.html',
	styleUrls: ['./vehicle-create.component.css'],
})
export class VehicleCreateComponent implements OnInit {
	createForm: FormGroup = new FormGroup({
		make: new FormControl('', [
			Validators.required,
			Validators.maxLength(30),
		]),
		model: new FormControl('', [
			Validators.required,
			Validators.maxLength(30),
		]),
		year: new FormControl('', [
			Validators.required,
			Validators.max(new Date().getFullYear()),
			Validators.min(1900),
		]),
	});

	error: string = '';
	submitting: boolean = false;

	constructor(
		private vehicleService: VehicleService,
		private location: Location
	) {}

	ngOnInit(): void {}

	onCancel(): void {
		this.location.back();
	}

	onSubmit(): void {
		const status: string = this.createForm.status;
		if (status === 'INVALID') return;

		this.error = '';
		this.submitting = true;

		const { make, model, year } = this.createForm.value;
		this.vehicleService.create(make, model, year).subscribe({
			next: () => {
				console.log('ok');
			},
			error: (err) => {
				const code: number = err.error.code;
				if (code === 11000) {
					this.error = 'Already exists.';
				} else {
					this.error = ' Something went wrong.';
				}
			},
			complete: () => {
				this.submitting = false;
			},
		});
	}
}
