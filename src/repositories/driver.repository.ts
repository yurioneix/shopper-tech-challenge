import { prisma } from "../database/prisma-client";
import { AllFieldsDriver, Driver, IDriverRepository } from "../interfaces/driver.interface";

export default class DriverRepository implements IDriverRepository{
    async findAll(): Promise<AllFieldsDriver[]> {
        const drivers = await prisma.driver.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                vehicle: true,
                review: true,
                value: true,
                minimumKm: true
            }
        });
        return drivers;
    }

}