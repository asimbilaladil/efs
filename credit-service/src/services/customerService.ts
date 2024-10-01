import { save } from "../repository/customerRepo";
import {ICustomer} from "../models/customerModel";
import {ErrorCodes, ErrorMessages, Routes} from "../constants";

interface CustomerData {
    firstName: string;
    lastName: string;
    email: string;
    iban?: string;
    city?: string;
    street?: string;
    zip?: number;
}

interface Response {
    data: ICustomer | null;
    message: string;
    statusCode: number;
}

export async function createCustomer(customerId: string): Promise<Response> {
    try {
        const uri: string = Routes.FETCH_CUSTOMER_BY_ID(customerId);

        const response = await fetch(uri);

        if (!response.ok) {
            return {
                message: ErrorMessages.FAILED_TO_FETCH_CUSTOMER_DATA,
                data: null,
                statusCode: ErrorCodes.NOT_FOUND
            }
        }

        const customerData: CustomerData = await response.json();

        const { firstName, lastName, email, iban, city, street, zip } = customerData;

        const data: ICustomer = {
            customerId,
            firstName,
            lastName,
            email,
            iban,
            city,
            street,
            zip,
        };

        await save(data);
        return {
            message: ErrorMessages.CUSTOMER_DATA_SAVED,
            data: data,
            statusCode: ErrorCodes.SUCCESS
        };
    } catch (error) {
        return {
            message: ErrorMessages.FAILED_TO_SAVE_CUSTOMER_DATA,
            data: null,
            statusCode: ErrorCodes.INTERNAL_SERVER_ERROR
        }
    }
}
