import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ProjectModel } from './project.model';
import { UserModel } from './user.model';

@Table({
  tableName: 'user_project',
  timestamps: false,
})
export class UserProjectModel extends Model<UserProjectModel> {
  @PrimaryKey
  @ForeignKey(()=>UserModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public user_id: number;

  @PrimaryKey
  @ForeignKey(()=>ProjectModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public project_id: number;

  @BelongsTo(()=> UserModel)
  public user: UserModel;

  @BelongsTo(()=>ProjectModel)
  public project: ProjectModel;
}
