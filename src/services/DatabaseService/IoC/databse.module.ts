import { Module } from '@nestjs/common';
import { DATABASE_SERVICE, MODELS, SEQUELIZE } from '../database.constants';
import { DatabaseService } from '../database.service';
import { databaseProviders } from './database.providers';

@Module({
  imports: [],
  providers: [
    { provide: DATABASE_SERVICE, useClass: DatabaseService },
    {
      provide: MODELS,
      useFactory: sequelize => {
        return sequelize.models;
      },
      inject: [SEQUELIZE],
    },
    ...databaseProviders,
  ],
  exports: [{ provide: DATABASE_SERVICE, useClass: DatabaseService }, MODELS, ...databaseProviders],
})
export class DatabaseModule {}
