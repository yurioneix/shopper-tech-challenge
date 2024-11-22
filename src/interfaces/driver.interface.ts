export interface Driver {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: object,
    value: number
}

export interface IDriverRepository {
    findAll(): Promise<Driver[]>;
}