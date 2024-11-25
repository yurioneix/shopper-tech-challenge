import fastify, { FastifyInstance } from "fastify";
import { driverRoutes } from "./routes/driver.route";

const app: FastifyInstance = fastify({logger: true});

app.register(driverRoutes, {
    prefix: '/'
});

app.register(driverRoutes, {
    prefix: '/ride/estimate',
});

app.listen({
    port: 3000
}, () => console.log("Server is running on port 3000!"))