import { prisma } from "../database/prisma-client";
import { Ride, IRideRepository, BodyRide } from "../interfaces/ride.interface";

export class RideRepository implements IRideRepository {
    async create(ride: BodyRide): Promise<BodyRide> {
        const newRide = await prisma.ride.create({
            data: {
               customer: {
                connect: { customer_id: Number(ride.customerId) },
               },
               driver: {
                connect: { id: ride.driver.id }
               },
               origin: ride.origin,
               destination: ride.destination,
               distance: ride.distance,
               duration: ride.duration,
               value: ride.value,
            },
            include: {
                customer: true,
                driver: true,
            }
        });

        return {
            customerId: String(newRide.customerId),
            origin: newRide.origin,
            destination: newRide.destination,
            distance: newRide.distance,
            duration: newRide.duration,
            driver: {
                id: newRide.driver.id,
                name: newRide.driver.name,
            },
            value: newRide.value,
        };
    }

    async getRidesByCustomerId(customerId: number, driverId?: number): Promise<BodyRide[]> {
        const getRides = await prisma.ride.findMany({
            where: {
                customerId: customerId, ...(driverId && { driverId: driverId })
            },
            include: { driver: true },
            orderBy: {
                date: "desc"
            }
        });

        return getRides.map((ride) => ({
            customerId: String(ride.customerId),
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            driver: {
                id: ride.driver.id,
                name: ride.driver.name,
            },
            value: ride.value,
        }));
    }
}