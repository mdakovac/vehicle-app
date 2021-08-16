import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintErrorComponent } from './components/print-error/print-error.component';

@NgModule({
	declarations: [PrintErrorComponent],
	imports: [CommonModule],
	exports: [PrintErrorComponent],
})
export class SharedModule {}
