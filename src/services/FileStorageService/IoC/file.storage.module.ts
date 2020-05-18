import { Module } from '@nestjs/common';
import { FILE_STORAGE_SERVICE } from '../file-storage.constants';
import { FileStorageService } from '../file-storage.service';

@Module({
  providers: [{provide: FILE_STORAGE_SERVICE, useClass: FileStorageService}],
  exports: [FILE_STORAGE_SERVICE]
})
export class FileStorageModule {
}
