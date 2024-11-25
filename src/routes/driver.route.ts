import { FastifyInstance } from "fastify";
import DriverUseCase from "../usecases/driver.usecase";
import { User } from "../interfaces/user.interface";

export async function driverRoutes(fastify: FastifyInstance) {
    const driverUseCase = new DriverUseCase();

    fastify.post<{Body: User }>('/ride/estimate', (req, reply) => {

        const { customerId, origin, destination } = req.body;

        try {
            const drivers = driverUseCase.findAllDrivers();
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get('/', (req, reply) => {
        const drivers = driverUseCase.findAllDrivers();
        return drivers;
    })
}