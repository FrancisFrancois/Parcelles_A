import { DateRange } from "./date-range";

export interface EventList {
    dateRange : DateRange;
    owner : string;
    user : string;
    parcel : string;   
    // id : number; A RAJOUTER
}
