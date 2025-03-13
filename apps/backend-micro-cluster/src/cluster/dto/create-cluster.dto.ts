import { Prisma } from '@repo/prisma-shared-schema-platform';

/**
 * DTO for creating a new cluster
 */
export class CreateClusterDto implements Prisma.tb_clusterCreateInput {
  code: string;
  name: string;
  description: string;
  location: string;
}
