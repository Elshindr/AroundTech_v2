import Utils from '../Utils/utils';
import { CityInterface } from './city.interface';
import { NatureInterface } from './nature.interface';
import { StatusInterface } from './status.interface';
import { TransportInterface } from './transport.interface';

export interface MissionInterface {
    id: number,
    userId: number,
    startDate: Date | string,
    endDate: Date | string,
    tjm: number,
    natureCur: NatureInterface,
    natureInit: NatureInterface,
    departCity: CityInterface,
    arrivalCity: CityInterface,
    transport: TransportInterface,
    status: StatusInterface
    totalExpenses: number,
    editable: boolean
}

export class Mission {

    static getEmptyMission(): MissionInterface {
        return {
            id: -1,
            userId: -1,
            startDate: Utils.formatDateToISO(null),
            endDate: "",
            tjm: -1,
            natureCur: {
                id: -1,
                name: "-1",
                charge: -1,
                bonus: false,
                tjm: -1,
                percentage: -1
            },
            natureInit: {
                id: -1,
                name: "-1",
                charge: -1,
                bonus: false,
                tjm: -1,
                percentage: -1
            },
            departCity: { name: "", id: -1 },
            arrivalCity: { name: "", id: -1 },
            transport: { name: "", id: -1 },
            status: { name: "", id: -1 },
            totalExpenses: -1,
            editable: false
        }
    }

}