import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileUploadService } from './file-upload.service';
import { FileUploadResponseDto } from '../../shared-dto/file-upload.dto';

@Controller()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @MessagePattern('upload_file')
  async uploadFile(
    @Payload() file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    return await this.fileUploadService.uploadFile(file);
  }
}
