import { Customer, ICustomer } from "../models/customerModel";

export async function save(data: ICustomer): Promise<ICustomer> {
    const document = new Customer(data);
    return document.save();
}

export async function findById(customerId: string): Promise<ICustomer | null> {
    return Customer.findOne({ customerId });
}