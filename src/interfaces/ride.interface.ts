export interface Ride { 
    customerId: number,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: string,
    value: number
}

export interface IRideRepository {
    create(ride: Ride): Promise<void>;
}