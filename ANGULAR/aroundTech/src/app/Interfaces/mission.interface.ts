import { CityInterface } from './city.interface';
import { NatureInterface } from './nature.interface';
import { StatusInterface } from './status.interface';
import { TransportInterface } from './transport.interface';

export interface MissionInterface {
    id: number,
    userId:number,
    startDate: Date|string,
    endDate: Date|string,
    tjm: number,
    natureCur: NatureInterface,
    natureInit:NatureInterface,
    departCity: CityInterface,
    arrivalCity: CityInterface,
    transport: TransportInterface,
    status: StatusInterface
    totalExpenses: number,
    editable: boolean
}