import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

const routes: Routes = [
	{
		path: 'vehicle',
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', component: VehicleListComponent },
			{ path: 'create', component: VehicleCreateComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VehicleRoutingModule {}
