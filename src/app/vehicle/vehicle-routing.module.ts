import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

const routes: Routes = [
	{
		path: 'vehicle',
		canActivateChild: [AuthGuardService],
		children: [{ path: '', component: VehicleListComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VehicleRoutingModule {}
