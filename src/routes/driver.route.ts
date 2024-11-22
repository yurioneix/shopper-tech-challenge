import { FastifyInstance } from "fastify";
import DriverUseCase from "../usecases/driver.usecase";

export function driverRoutes(fastify: FastifyInstance) {
    const driverUseCase = new DriverUseCase();

    fastify.post('/ride/estimate', (req, reply) => {

        const { customerId, origin, destination } = req.body;

        try {
            const drivers = driverUseCase.findAllDrivers();
        } catch (error) {
            reply.send(error);
        }
    })
}