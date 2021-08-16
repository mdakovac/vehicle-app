import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [VehicleListComponent, VehicleCreateComponent],
	imports: [
		CommonModule,
		VehicleRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		SharedModule,
	],
})
export class VehicleModule {}
