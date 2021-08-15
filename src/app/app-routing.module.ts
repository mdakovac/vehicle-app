import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { VehicleRoutingModule } from './modules/vehicle/vehicle-routing.module';

const routes: Routes = [
	{ path: '', redirectTo: '/vehicle', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		AuthRoutingModule,
		VehicleRoutingModule,
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
