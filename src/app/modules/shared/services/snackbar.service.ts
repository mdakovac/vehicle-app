import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	constructor(private snackBar: MatSnackBar) {}

	private openSnackBar(message: string, isSuccess: boolean): void {
		this.snackBar.open(message, 'Dismiss', {
			horizontalPosition: 'right',
			verticalPosition: 'top',
			duration: 5000,
			panelClass: [
				'mat-toolbar',
				isSuccess ? 'mat-primary' : 'mat-warn',
				'dialog-action',
			],
		});
	}

	success(message: string) {
		this.openSnackBar(message, true);
	}

	error(message: string) {
		this.openSnackBar(message, false);
	}
}
