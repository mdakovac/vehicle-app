import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
	declarations: [VehicleListComponent],
	imports: [CommonModule, VehicleRoutingModule, MaterialModule, FormsModule],
})
export class VehicleModule {}
