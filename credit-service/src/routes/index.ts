import { Hono } from "hono";
import { creditAppRoutes } from './creditApplicationRoutes';
import { CustomerWebhookRoutes } from './customerWebhookRoutes';

export const Routes = (app: Hono) => {
    app.route("/", creditAppRoutes);
    app.route("/", CustomerWebhookRoutes);
};
