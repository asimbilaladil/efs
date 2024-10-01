import { Hono } from "hono";
import { createCreditApplication } from "../services/creditApplicationService";
import { ICreditApplication } from "../models/creditApplicationModel";
import {ErrorCodes, ErrorMessages, Routes} from "../constants";

export const creditAppRoutes = new Hono();
interface IResponse {
    message: string;
    data: ICreditApplication | null,
    statusCode: number;
};

creditAppRoutes.post(Routes.CREATE_CREDIT_APPLICATION, async (c) => {
    try {
        const body = await c.req.json();
        const { customerId, loanAmount, term } = body;

        if (!customerId || !loanAmount || !term) {
            return c.json(
                { message: ErrorMessages.INVALID_CREATE_CREDIT_REQUEST, data: null, statusCode: ErrorCodes.INVALID_REQUEST },
                ErrorCodes.INVALID_REQUEST
            );
        }

        const result: IResponse = await createCreditApplication(customerId, loanAmount, term);

        if (result.statusCode === ErrorCodes.SUCCESS) {
            return c.json(result, ErrorCodes.SUCCESS);
        }
        return c.json(result, result.statusCode);


    } catch (error) {
        return c.json({ error: ErrorMessages.INTERNAL_SERVER_ERROR }, ErrorCodes.INTERNAL_SERVER_ERROR);
    }
});