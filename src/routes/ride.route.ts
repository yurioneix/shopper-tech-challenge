import { FastifyInstance } from "fastify";
import { RideUseCase } from "../usecases/ride.usecase";
import { Ride } from "../interfaces/ride.interface";
import { bodySchema } from "../validations/body.schema";
import { JsonValue } from "@prisma/client/runtime/library";


export async function rideRoutes(fastify: FastifyInstance) {
    const rideUseCase = new RideUseCase();

    fastify.patch<{Body: Ride}>('/confirm', {
        schema: {
            body: bodySchema,
        },
        preValidation: async (req, reply) => {
            // "driver": {
                // "id": number,
                // "name": string
            // },
            // driver
            const { origin, destination, distance, driver } = req.body;
             

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