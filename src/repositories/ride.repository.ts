import { prisma } from "../database/prisma-client";
import { Ride, IRideRepository } from "../interfaces/ride.interface";

export class RideRepository implements IRideRepository {
    async create(ride: Ride): Promise<Ride> {
        const newRide = await prisma.ride.create({
            data: {
                customerId: ride.customerId,
                origin: ride.origin,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                driver: ride.driver,
                value: ride.value
            },
        });

        return newRide;
    }
}