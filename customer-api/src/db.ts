import { PrismaClient, type Prisma } from "@prisma/client";
import { ResultAsync } from "neverthrow";

const prisma = new PrismaClient();

// Create customerRepo wrapper
export const customerRepo = {
	create: (data: Prisma.CustomerCreateInput) =>
		ResultAsync.fromPromise(prisma.customer.create({ data }), (e) => e),
	findUnique: (where: Prisma.CustomerWhereUniqueInput) =>
		ResultAsync.fromPromise(prisma.customer.findUnique({ where }), (e) => e),
	findMany: (params?: Prisma.CustomerFindManyArgs) =>
		ResultAsync.fromPromise(prisma.customer.findMany(params), (e) => e),
	update: (params: Prisma.CustomerUpdateArgs) =>
		ResultAsync.fromPromise(prisma.customer.update(params), (e) => e),
	delete: (where: Prisma.CustomerWhereUniqueInput) =>
		ResultAsync.fromPromise(prisma.customer.delete({ where }), (e) => e),

	$transaction: <T>(fn: (prismaTx: Prisma.TransactionClient) => Promise<T>) =>
		ResultAsync.fromPromise(prisma.$transaction(fn), (e) => e),
};
