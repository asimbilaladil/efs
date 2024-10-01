import { Hono, Context } from "hono";
import { createCustomer } from "../services/customerService";
import {ErrorCodes, ErrorMessages, Routes, WebHookEvents} from "../constants";

interface CustomerWebhookBody {
    data: {
        event: string;
        customerId: string;
    };
}
interface IResponse {
    message: string;
    statusCode: number;
}
export const CustomerWebhookRoutes = new Hono();


CustomerWebhookRoutes.post(Routes.WEBHOOK_CUSTOMER, async (c: Context): Promise<any> => {
    try {
        const body = await c.req.json<CustomerWebhookBody>();
        const customerId = body.data.customerId;

        if (body.data.event === WebHookEvents.CUSTOMER_CREATED) {
            const res: IResponse = await createCustomer(customerId);
            return c.json(res.message, res.statusCode);
        }

    } catch (error) {
        return c.json({ message: ErrorMessages.FAILED_TO_PROCESS_WEBHOOK }, ErrorCodes.INTERNAL_SERVER_ERROR);
    }
});
