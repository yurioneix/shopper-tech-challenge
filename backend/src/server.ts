import fastify, { FastifyInstance } from "fastify";
import { driverRoutes } from "./routes/driver.route";
import { rideRoutes } from "./routes/ride.route";

const app: FastifyInstance = fastify({logger: true});

app.register(driverRoutes, {
    prefix: '/ride',
});

app.register(rideRoutes, {
    prefix: '/ride',
})

app.listen({
    port: 3001
}, () => console.log("Server is running on port 3000!"))