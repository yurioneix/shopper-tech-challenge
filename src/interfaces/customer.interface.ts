export interface Customer { 
    customerId: string,
    origin: string,
    destination: string
}

export interface ICustomerRepository {
    create(customer: Customer): Promise<Customer>;
}