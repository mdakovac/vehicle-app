import { IVehicle } from './IVehicle';

export interface IVehicleFindResponse {
	total: number;
	items: IVehicle[];
	rpp: number;
	page: number;
	query: string;
}
