/** @format */

import { PrismaClient } from '../generated/client';
const clients: {
	[key: string]: { client: PrismaClient; datasourceURL: string } | null;
} = {};

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma_tenant = async (tenantId: string, datasourceURL: string) => {
	let clientData = clients[tenantId];

	if (clientData) {
		// Check if the existing client is using the updated database URL
		if (clientData.datasourceURL !== datasourceURL) {
			await clientData.client.$disconnect();
			clientData = null;
		}
	}

	if (!clientData) {
		const client = new PrismaClient({
			datasources: {
				db: {
					url: datasourceURL,
				},
			},
		});

		// Test the database connection
		try {
			await client.$connect();
			clients[tenantId] = { client, datasourceURL };
			return clients[tenantId].client;
		} catch (error: unknown) {
			throw new Error(`Failed to connect to the database for tenant: ${tenantId}`);
		}
	}
};
