import { FastifyInstance } from "fastify";
import { RideUseCase } from "../usecases/ride.usecase";
import { Ride } from "../interfaces/ride.interface";
import { bodySchema } from "../validations/body.schema";


export async function rideRoutes(fastify: FastifyInstance) {
    const rideUseCase = new RideUseCase();

    fastify.patch<{Body: Ride}>('/ride/confirm', {
        schema: {
            body: bodySchema,
        },
        preSerialization: async (req, reply) => {
            const { origin, destination } = req.body;

            if (origin === destination) {
                reply.status(400).send({
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

         const ride = {
            customerId,
            origin,
            destination,
            distance,
            duration,
            driver,
            value
         }

        const newRide = await rideUseCase.createRide(ride);
        
        if (newRide) {
            reply.status(200).send({
                sucess: "true",
            })
        }
    });
}