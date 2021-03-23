import { Inject, Injectable } from '@nestjs/common';
import { TransactionOptions } from 'sequelize';
import { IDatabaseService } from './database.interfaces';
import { SEQUELIZE } from './database.constants';

@Injectable()
export class DatabaseService implements IDatabaseService {
  constructor(@Inject(SEQUELIZE) private readonly sequelize) {}
  public async transaction(cb, options: TransactionOptions = {}): Promise<any> {
    return this.sequelize.transaction(options, async () => {
      return cb();
    });
  }
}
