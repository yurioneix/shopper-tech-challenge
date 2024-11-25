import { prisma } from "../database/prisma-client";
import { Driver, IDriverRepository } from "../interfaces/driver.interface";

export default class DriverRepository implements IDriverRepository{
    async findAll(): Promise<Driver[]> {
        const drivers = await prisma.driver.findMany();
        return drivers;
    }

}