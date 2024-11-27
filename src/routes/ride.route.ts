import { FastifyInstance } from "fastify";
import { RideUseCase } from "../usecases/ride.usecase";
import { BodyRide } from "../interfaces/ride.interface";
import { bodyRideSchema } from "../validations/body.ride.schema";
import DriverUseCase from "../usecases/driver.usecase";

export async function rideRoutes(fastify: FastifyInstance) {
    const rideUseCase = new RideUseCase();
    const driverUseCase = new DriverUseCase();

    fastify.patch<{Body: BodyRide}>('/confirm', {
        schema: {
            body: bodyRideSchema,
        },
        preValidation: async (req, reply) => {
            const { origin, destination } = req.body;
             

            if (origin === destination) {
                return reply.status(400).send({
                    error_code: "INVALID_DATA",
                    error_description: "Os dados fornecidos no corpo da requisição são inválidos"
                })
            }
        }
    },
    async (req, reply) => {
        const { 
            customerId,
            origin,
            destination,
            distance,
            duration,
            driver,
            value
         } = req.body;

         const drivers = await driverUseCase.findAllDrivers();

         const findValidDriver = drivers.find((element) => element.id === driver.id);

        if (findValidDriver === undefined) {
            return reply.status(404).send({
                error_code: "DRIVER_NOT_FOUND",
                error_description: "Motorista não encontrado"
                })
        }

        const checkMinimumRideDistance = distance >= findValidDriver.minimumKm;

        if (!checkMinimumRideDistance) {
            return reply.status(406).send({
                error_code: "INVALID_DISTANCE",
                error_description: "Quilometragem inválida para o motorista"
                })
        }

         const ride = {
            customerId,
            origin,
            destination,
            distance,
            duration,
            driver: JSON.stringify(driver),
            value
         }

        const newRide = await rideUseCase.createRide(ride);
        
        if (newRide) {
            return reply.status(200).send({
                sucess: "true",
            })
        }
    });
}