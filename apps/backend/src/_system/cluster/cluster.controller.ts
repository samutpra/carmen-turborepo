import { Controller } from '@nestjs/common';
import { ClusterService } from './cluster.service';

@Controller('cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}
}
