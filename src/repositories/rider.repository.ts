import { prisma } from "../database/prisma-client";
import { Ride, IRideRepository } from "../interfaces/ride.interface";

export class RideRepositoy implements IRideRepository {
    async create(ride: Ride): Promise<void> {
        const newRide = await prisma.ride.create({
            data: ride,
        });
    }
}