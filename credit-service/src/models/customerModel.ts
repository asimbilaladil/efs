import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    iban?: string;
    city?: string;
    street?: string;
    zip?: number;
}

const customerSchema = new Schema<ICustomer>({
    customerId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    iban: { type: String},
    city: { type: String},
    street: { type: String},
    zip: { type: Number}
}, { timestamps: true });

export const Customer = mongoose.model<ICustomer>('Customer', customerSchema);
