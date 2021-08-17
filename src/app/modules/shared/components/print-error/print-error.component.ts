import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-print-error',
	templateUrl: './print-error.component.html',
	styleUrls: ['./print-error.component.css'],
})
export class PrintErrorComponent implements OnInit {
	@Input('controlName')
	controlName!: string;

	public control?: AbstractControl;
	public hasSubmitted?: boolean;

	private submitSubscriber$?: Subscription;

	constructor(private formDirective: FormGroupDirective) {}

	ngOnInit(): void {
		this.control = this.formDirective.form.controls[this.controlName];

		this.submitSubscriber$ = this.formDirective.ngSubmit?.subscribe(
			() => (this.hasSubmitted = this.formDirective.submitted)
		);
	}

	ngOnDestroy(): void {
		this.submitSubscriber$?.unsubscribe();
	}
}
