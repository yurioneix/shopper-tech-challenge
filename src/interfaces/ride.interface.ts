import { JsonValue } from "@prisma/client/runtime/library";

export interface Ride { 
    customerId: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: string,
    value: number
}

export interface IRideRepository {
    create(ride: Ride): Promise<Ride>;
}