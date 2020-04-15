import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../DatabaseService/IoC/databse.module';
import { USER_SERVICE } from '../usser.constants';
import { UserService } from '../user.service';
import { UserModelMappers } from '../mappers/user-model.mappers';
import { KeyValueStoreModule } from '../../KeyValueService/IoC/key.value.store.module';

@Module({
  imports: [DatabaseModule, KeyValueStoreModule],
  providers: [{provide: USER_SERVICE, useClass: UserService}, UserModelMappers],
  exports: [USER_SERVICE]
})
export class UserModule {
}
