export interface Customer { 
    customer_id: number,
    origin: string,
    destination: string
}

export interface ICustomerRepository {
    create(customer: Customer): Promise<Customer>;
}