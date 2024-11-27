export const bodyRideSchema = {
    type: "object",
    required: ["customerId", "origin", "destination", "distance", "driver", "value"],
    properties: {
        customerId: { type: "string" },
        origin: { type: "string" },
        destination: { type: "string" },
        distance: { type: "number" },
        duration: { type: "string" },
        driver: {
            type: "object",
            required: ["id", "name"],
            properties: {
                id: { type: "number" },
                name: { type: "string" },
            },
        },
        value: { type: "number" },
    },
};