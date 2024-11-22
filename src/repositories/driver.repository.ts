import { Driver, IDriverRepository } from "../interfaces/driver.interface";

export default class DriverRepository implements IDriverRepository{
    findAll(): Promise<Driver[]> {
        throw new Error("Method not implemented.");
    }

}