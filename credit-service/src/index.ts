import { Hono } from "hono";

import { connectToDatabase } from './config/mongodbConfig';
import { Routes } from './routes';

connectToDatabase();
export const app = new Hono();

console.log('Starting webhook listener...');

Routes(app);

export default {
    port: 8080,
    fetch: app.fetch,
};
