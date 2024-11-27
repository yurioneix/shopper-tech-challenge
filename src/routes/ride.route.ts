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
            distance,
            driver,
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

        const newRide = await rideUseCase.createRide(req.body);
        
        if (newRide) {
            return reply.status(200).send({
                sucess: "true",
            })
        }
    });

    fastify.get<{ 
        Params: { customerId: string};  
        Querystring: { driver_id?: string };
    }>
    ('/:customerId', 
        {
            preValidation: async (req, reply) => {
                const { customerId } = req.params;
                if (!customerId) {
                    return reply.status(400).send({
                        error_code: "INVALID_DATA",
                        error_description: "Informe um ID de customer nos parâmetros da busca"
                    })
                }
            }
        },
        async (req, reply) => {
            const { customerId } = req.params;
            const { driver_id } = req.query;

            if (driver_id !== undefined) {
                const drivers = await driverUseCase.findAllDrivers();
    
                const findDriverByDriverId = drivers.find((driver) => driver.id === Number(driver_id));
    
                if (findDriverByDriverId === undefined) {
                    return reply.status(400).send({
                            error_code: "INVALID_DRIVER",
                            error_description: "Motorista inválido",
                        })
                }

                const getRidesByCustomerIdWithDriverId = await rideUseCase.getRidesByCustomerId(Number(customerId), Number(driver_id));

                return reply.status(200).send({
                    customer_id: customerId,
                    rides: getRidesByCustomerIdWithDriverId.map(ride => ({
                        id: ride.customerId,
                        date: ride.date,
                        origin: ride.origin,
                        destination: ride.destination,
                        distance: ride.distance,
                        duration: ride.duration,
                        driver: {
                            id: ride.driver.id,
                            name: ride.driver.name,
                        },
                        value: ride.value,
                    })),
                });
            }


            const getRidesByCustomerId = await rideUseCase.getRidesByCustomerId(Number(customerId), driver_id);

            if (getRidesByCustomerId.length === 0) {
                return reply.status(404).send(
                    {
                        error_code: "NO_RIDES_FOUND",
                        error_description: "Nenhum registro encontrado"
                    }
                );
            }

            return reply.status(200).send({
                customer_id: customerId,
                rides: getRidesByCustomerId.map(ride => ({
                    id: ride.id,
                    date: ride.date,
                    origin: ride.origin,
                    destination: ride.destination,
                    distance: ride.distance,
                    duration: ride.duration,
                    driver: {
                        id: ride.driver.id,
                        name: ride.driver.name,
                    },
                    value: ride.value,
                })),
            });
        }
    )
}