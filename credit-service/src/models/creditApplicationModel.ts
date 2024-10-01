import {mongoose, Schema} from 'mongoose';

export interface ICreditApplication extends Document {
    customerId: string;
    loanAmount: number;
    term: number;
    eligible: boolean;
    schufaScore: string;
}

const creditApplicationSchema = new Schema<ICreditApplication>({
    customerId: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    term: { type: Number, required: true },
    eligible: { type: Boolean, required: true },
    schufaScore: { type: String, required: true },
}, { timestamps: true });

export const CreditApplication = mongoose.model<ICreditApplication>('CreditApplication', creditApplicationSchema);

