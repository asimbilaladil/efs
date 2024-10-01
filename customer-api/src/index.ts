import { Hono } from "hono";
import { err, ok, safeTry } from "neverthrow";
import { customerRepo } from "./db";
import { sendWebhook } from "./send";
import { logAndReturnError, setRandomTimeout, toRes } from "./utils";

const app = new Hono();

console.log("Starting contact service...");

const MAX_DELAY = Number(process.env.MAX_DELAY) || 15000;

// Create customer
app.post("/api/v1/customer", async (c) => {
	return await safeTry(async function* () {
		// Parse request body
		const data = yield* (await toRes(c.req.json())).safeUnwrap();

		await setRandomTimeout(1000, MAX_DELAY);

		// Create customer in the database
		const customer = yield* (
			await customerRepo.create({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				iban: data.iban,
				city: data.city,
				street: data.street,
				zip: data.zip,
			})
		).safeUnwrap();

		// Send webhook
		yield* (
			await sendWebhook(
				{ event: "customer.created", customerId: customer.id },
				"customer",
			)
		).safeUnwrap();

		// Return the created customer
		return ok(customer);
	})
		.mapErr((e) => logAndReturnError("Failed to create customer", e))
		.match(
			(res) => c.json(res, 201),
			(err) => c.json({ error: err }, 500),
		);
});

// Get customer List
app.get("/api/v1/customer", async (c) => {
	return await safeTry(async function* () {
		// Fetch customers from the database
		const customers = yield* (await customerRepo.findMany({})).safeUnwrap();

		await setRandomTimeout(1000, MAX_DELAY);

		return ok(customers);
	})
		.mapErr((e) => logAndReturnError("Failed to fetch customers", e))
		.match(
			(res) => c.json(res, 200),
			(err) => c.json({ error: err }, 500),
		);
});

// Get customer by ID
app.get("/api/v1/customer/:id", async (c) => {
	const id = c.req.param("id");

	return await safeTry(async function* () {
		// Find customer in the database
		const customer = yield* (
			await customerRepo.findUnique({ id })
		).safeUnwrap();
		if (!customer) {
			return err("Customer not found");
		}

		await setRandomTimeout(1000, MAX_DELAY);

		// Return the customer
		return ok(customer);
	})
		.mapErr((e) =>
			logAndReturnError(`Failed to fetch customer with ID ${id}`, e),
		)
		.match(
			(res) => c.json(res, 200),
			(err) => {
				const statusCode =
					err._unsafeUnwrapErr() === "Customer not found" ? 404 : 500;

				return c.json({ error: err }, statusCode);
			},
		);
});

// Update customer
app.put("/api/v1/customer/:id", async (c) => {
	return await safeTry(async function* () {
		const id = c.req.param("id");

		// Parse request body
		const data = yield* (await toRes(c.req.json())).safeUnwrap();

		// Update customer in the database
		const customer = yield* (
			await customerRepo.update({
				where: { id },
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					iban: data.iban,
					city: data.city,
					street: data.street,
					zip: data.zip,
				},
			})
		).safeUnwrap();

		await setRandomTimeout(1000, MAX_DELAY);

		// Send webhook
		yield* (
			await sendWebhook(
				{ event: "customer.updated", customerId: customer.id },
				"customer",
			)
		).safeUnwrap();

		// Return the updated customer
		return ok(customer);
	})
		.mapErr((e) => logAndReturnError("Failed to update customer", e))
		.match(
			(res) => c.json(res, 200),
			(err) => c.json({ error: err }, 500),
		);
});

// Delete customer
app.delete("/api/v1/customer/:id", async (c) => {
	return await safeTry(async function* () {
		const id = c.req.param("id");

		// Delete customer from the database
		yield* (await customerRepo.delete({ id })).safeUnwrap();

		await setRandomTimeout(1000, MAX_DELAY);

		// Send webhook
		yield* (
			await sendWebhook(
				{ event: "customer.deleted", customerId: id },
				"customer",
			)
		).safeUnwrap();

		// Return success message
		return ok({ message: "Customer deleted" });
	})
		.mapErr((e) => logAndReturnError("Failed to delete customer", e))
		.match(
			(res) => c.json(res, 200),
			(err) => c.json({ error: err }, 500),
		);
});

export default {
	port: 3000,
	fetch: app.fetch,
};
