export const bodySchema = {
    type: 'object',
    required: ['customerId', 'origin', 'destination'],
    properties: {
        customerId: { type: 'string'},
        origin: { type: 'string'},
        destination: { type: 'string'}
    }
};