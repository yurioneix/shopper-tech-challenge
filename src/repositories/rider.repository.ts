import { prisma } from "../database/prisma-client";
import { Ride, IRideRepository } from "../interfaces/ride.interface";

export class RideRepositoy implements IRideRepository {
    async create(ride: Ride): Promise<Ride> {
        const newRide = await prisma.ride.create({
            data: ride,
        });

        return newRide;
    }
}