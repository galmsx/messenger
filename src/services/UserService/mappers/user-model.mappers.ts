import { UserModel } from '../../DatabaseService/models/user.model';
import { IUserExtendedInfo } from '../user.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { KEY_VALUE_SERVICE } from '../../KeyValueService/key.value.store.constants';
import { KeyValueStoreService } from '../../KeyValueService/key.value.store.service';

@Injectable()
export class UserModelMappers {
  constructor(@Inject(KEY_VALUE_SERVICE) private readonly keyValue: KeyValueStoreService) {}
  public async ModelToExtendedInfo(model: UserModel): Promise<IUserExtendedInfo> {
    const socketId = await this.keyValue.getSting(Number(model.id).toString());

    return {
      id: model.id,
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      department: model.department.get() as any,
      projects: model.user_project.map(up => up.project.get() as any),
      position: model.position.get() as any,
      avatar: model.avatar,
      public_key: model.public_key,
      department_id: model.department_id,
      position_id: model.position_id,
      socketId: socketId,
    };
  }
}
