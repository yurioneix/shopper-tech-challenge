export interface Rider { 
    customerId: number,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: string,
    value: number
}

export interface IRideRepository {
    create(): Promise<void>
}