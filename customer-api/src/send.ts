import { ok } from "neverthrow";
import { toRes } from "./utils";

type WebhookEvent =
	| "customer.created"
	| "customer.updated"
	| "customer.deleted";

export async function sendWebhook(
	data: {
		event: WebhookEvent;
		customerId: string;
	},
	path: string,
) {
	if (process.env.IGNORE_WEBHOOK === "true") {
		return ok(null);
	}

	console.log('data',data);
	console.log(`process.env.CUSTOMER_API_HOSTNAME:`, process.env.CUSTOMER_API_HOSTNAME);

	return await toRes(
		fetch(
			`http://${
				process.env.CUSTOMER_API_HOSTNAME || "localhost"
			}:8080/webhook/${path}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data }),
			},
		),
	);
}
