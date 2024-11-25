export interface Driver {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: string,
    value: number
}

export interface IDriverRepository {
    findAll(): Promise<Driver[]>;
}