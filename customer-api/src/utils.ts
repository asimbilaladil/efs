import { err, type Result, ResultAsync } from "neverthrow";
import { setTimeout } from "node:timers/promises";

/**
 * This function wraps a promise in a ResultAsync, which allows us to handle errors
 * @param promise
 */
export async function toRes<T>(promise: Promise<T>): Promise<Result<T, unknown>> {
	return ResultAsync.fromPromise(promise, (e) => {
		console.error("Error in toRes:", e);
		return e;
	});
}

/**
 * Waits for a specified amount of time before resolving.
 * @param min 
 * @param max 
 */
export async function setRandomTimeout(min: number, max: number) {
	await setTimeout(Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * A reusable function for logging an error message and returning a Result error.
 * @param errorMsg - The custom error message to log and return.
 * @param error - The original error object to log for debugging.
 * @returns Result.Error with the provided error message.
 */
export function logAndReturnError<T>(
	errorMsg: string,
	error: unknown,
): Result<T, string> {
	console.error(`${errorMsg}:`, error);
	return err(errorMsg);
}
