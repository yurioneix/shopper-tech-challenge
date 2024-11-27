import { BodyRide, RideComplete } from "../interfaces/ride.interface";
import { RideRepository } from "../repositories/ride.repository";

export class RideUseCase {
    private rideRepository: RideRepository;

    constructor() {
        this.rideRepository = new RideRepository();
    }

    async createRide(ride: BodyRide): Promise<BodyRide> {
        const newRide = await this.rideRepository.create(ride);

        return newRide;
    }

    async getRidesByCustomerId(customerId: number, driverId?: number): Promise<RideComplete[]> {
        const getRides = await this.rideRepository.getRidesByCustomerId(customerId, driverId);
        return getRides;
    }
}