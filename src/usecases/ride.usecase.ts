import { BodyRide } from "../interfaces/ride.interface";
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
}