import { Controller, Inject, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_STORAGE_SERVICE } from '../../../FileStorageService/file-storage.constants';
import { FileStorageService } from '../../../FileStorageService/file-storage.service';

@Controller('/api/file')
@UseGuards(AuthGuard)
export class FileController {
  constructor(@Inject(FILE_STORAGE_SERVICE) private readonly fileStorageService: FileStorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file): Promise<{ link: string }> {
    const link = await this.fileStorageService.uploadFile(file);
    return { link };
  }
}
