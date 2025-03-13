import { PartialType } from '@nestjs/mapped-types';
import { CreateClusterDto } from './create-cluster.dto';

/**
 * DTO for updating an existing cluster
 */
export class UpdateClusterDto extends PartialType(CreateClusterDto) {}
