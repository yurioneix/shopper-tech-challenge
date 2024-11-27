export interface Driver {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: string,
    value: number
}

export interface AllFieldsDriver {
    id: number,
    name: string,
    description: string,
    vehicle: string,
    review: string,
    value: number,
    minimumKm: number
}

export interface IDriverRepository {
    findAll(): Promise<AllFieldsDriver[]>;
}