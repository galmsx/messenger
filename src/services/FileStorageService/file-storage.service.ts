import { Injectable } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class FileStorageService {
  public async uploadFile(file): Promise<string> {
    const filename: string = uuid() + file.originalname.slice(file.originalname.indexOf('.'));
    await fs.writeFile(path.join(__dirname, '../../../static/files/',filename), file.buffer);
    return '/files/' + filename;
  }
}
