import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [VehicleListComponent],
	imports: [
		CommonModule,
		VehicleRoutingModule,
		MatTableModule,
		MatInputModule,
		MatPaginatorModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
	],
})
export class VehicleModule {}
