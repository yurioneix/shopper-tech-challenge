import { FastifyInstance } from "fastify";
import DriverUseCase from "../usecases/driver.usecase";
import { Customer } from "../interfaces/customer.interface";
import { bodyDriverSchema } from "../validations/body.driver.schema";
import getRoute from "../utils/apiRoutes";
import { parseLatLng } from "../utils/parseStringToLatLong";
import { CustomerUseCase } from "../usecases/customer.usecase";

export async function driverRoutes(fastify: FastifyInstance) {
    const driverUseCase = new DriverUseCase();
    const customerUseCase = new CustomerUseCase();

    fastify.post<{Body: Customer }>('/estimate', {
        schema: {
            body: bodyDriverSchema,
        },
        preValidation: async (req, reply) => {
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
        const { origin, destination } = req.body;

        customerUseCase.createCustomer(req.body);

        const drivers = await driverUseCase.findAllDrivers();
        const changeReviewDrivers = drivers.map(driver => {
            const [rating, ...comments] = driver.review.split(/\/5\s+/);
            return {
                ...driver,
                review: {
                    rating: parseInt(rating, 10),
                    comment: comments.join(' ')
                }
            }
        })

        const bodyOrigin = parseLatLng(origin);
        const bodyDestination = parseLatLng(destination);

        if (bodyOrigin && bodyDestination) {
            const routesResponse = await getRoute(bodyOrigin, bodyDestination)
            const distanceMeters = routesResponse.routes[0].distanceMeters;
            const duration = routesResponse.routes[0].duration;

            reply.status(200).send({
                origin: bodyOrigin,
                destination: bodyDestination,
                distance: distanceMeters,
                duration,
                options: changeReviewDrivers,
                routeResponse: routesResponse
            });
        }

    });

    fastify.get('/drivers', (req, reply) => {
        const drivers = driverUseCase.findAllDrivers();
        return drivers; 
    });
}