export interface Ride { 
    customerId: number,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: number,
    value: number
}

export interface BodyRide { 
    customerId: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: { id: number, name: string },
    value: number
}

export interface RideComplete { 
    id: number,
    date: Date,
    customerId: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    value: number,
    driver: {
        id: number,
        name: string,
    },
}

export interface IRideRepository {
    create(ride: BodyRide): Promise<BodyRide>;
}