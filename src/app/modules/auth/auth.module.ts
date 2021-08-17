import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './components/logout/logout.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
	declarations: [LoginComponent, LogoutComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MaterialModule,
		AuthRoutingModule,
	],
	exports: [LogoutComponent],
})
export class AuthModule {}
