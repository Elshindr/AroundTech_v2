import { CityInterface } from './city.interface';
import { NatureInterface } from './nature.interface';
import { StatusInterface } from './status.interface';
import { TransportInterface } from './transport.interface';

export interface MissionInterface {
    id: number,
    startDate: Date,
    endDate: Date,
    tjm: number,
    natureCur: NatureInterface,
    departCity: CityInterface,
    arrivalCity: CityInterface,
    transport: TransportInterface,
    status: StatusInterface
    totalExpenses: number,
    editable: boolean
}