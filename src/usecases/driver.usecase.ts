import { AllFieldsDriver, Driver } from "../interfaces/driver.interface";
import DriverRepository from "../repositories/driver.repository";

export default class DriverUseCase {
    private driverRepository: DriverRepository
    constructor() {
        this.driverRepository = new DriverRepository();
    }

    async findAllDrivers(): Promise<AllFieldsDriver[]> {
        const drivers = this.driverRepository.findAll();

        return drivers;
    }
}