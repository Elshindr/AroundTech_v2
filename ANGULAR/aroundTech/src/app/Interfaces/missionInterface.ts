import { NatureInterface } from './natureInterface';

export interface MissionInterface{
    id: number,
    startDate: Date,
    endDate:Date,
    tjm:number,
    Nature: NatureInterface
}