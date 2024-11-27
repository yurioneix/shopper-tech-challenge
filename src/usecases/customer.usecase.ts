import { Customer } from "../interfaces/customer.interface";
import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerUseCase {
    private customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        const newCustomer = await this.customerRepository.create(customer);

        return newCustomer;
    }
}