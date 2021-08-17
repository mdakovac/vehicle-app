import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintErrorComponent } from './components/print-error/print-error.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
	declarations: [PrintErrorComponent, ConfirmDeleteDialogComponent],
	imports: [CommonModule, MaterialModule],
	exports: [PrintErrorComponent, ConfirmDeleteDialogComponent],
})
export class SharedModule {}
