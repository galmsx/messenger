import { Inject, Injectable } from '@nestjs/common';
import { MODELS } from '../DatabaseService/database.constants';
import { IModels } from '../DatabaseService/database.interfaces';
import { UserModel } from '../DatabaseService/models/user.model';
import { IUser, IUserExtendedInfo } from './user.interfaces';
import { DepartmentModel } from '../DatabaseService/models/department.model';
import { PositionModel } from '../DatabaseService/models/position.model';
import { UserProjectModel } from '../DatabaseService/models/user_project.model';
import { ProjectModel } from '../DatabaseService/models/project.model';
import { UserModelMappers } from './mappers/user-model.mappers';
import * as Bluebird from 'bluebird';
import { Op } from 'sequelize';

Injectable()
export class UserService {
constructor(@Inject(MODELS) private readonly models: IModels, private readonly userModelMappers: UserModelMappers){}

public getUserInfo(filter: Partial<UserModel>): Promise<IUser> {
  return this.models.UserModel.findOne({ where: (filter as any), raw: true });
}

public async getUserExtendedInfo(filter: Partial<UserModel>): Promise<IUserExtendedInfo>{
  const user = await this.models.UserModel.findOne(
    {
      where: (filter as any),
      include :[
        {model: DepartmentModel},
        {model: PositionModel},
        {model: UserProjectModel, include: [ProjectModel]}
      ], plain: true
    }
    );
  return this.userModelMappers.ModelToExtendedInfo(user);
}


public async updateUserInfo(id: number, data: Partial<UserModel> ): Promise<void>{
  await this.models.UserModel.update(data,{where: {id}});
}

public async findUsers(search: string): Promise<IUserExtendedInfo[]>{
  if(!search.length) return[];

  const users = await this.models.UserModel.findAll(
    {
      where:{
        public_key :{[Op.ne]: null}
      },
      include :[
        {model: DepartmentModel},
        {model: PositionModel},
        {model: UserProjectModel, include: [ProjectModel]}
      ]
    }
  );

  const usersFormatted = await Bluebird.map(users, async (u) => await this.userModelMappers.ModelToExtendedInfo(u));

  return usersFormatted.filter(c => (c.first_name + ' ' + c.last_name).includes(search));
}
}
