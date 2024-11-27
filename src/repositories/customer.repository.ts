import { prisma } from "../database/prisma-client";
import { Customer, ICustomerRepository } from "../interfaces/customer.interface";

export class CustomerRepository implements ICustomerRepository {
    async create(customer: Customer): Promise<Customer> {
        const newCustomer = await prisma.customer.create({
            data: {
                customerId: Number(customer.customerId),
                origin: customer.origin,
                destination: customer.destination,
            }
        });

        return newCustomer
    }
    
}