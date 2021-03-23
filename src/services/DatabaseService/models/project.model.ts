import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserProjectModel } from './user_project.model';

@Table({
  tableName: 'project',
  timestamps: false,
})
export class ProjectModel extends Model<ProjectModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  public id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public title: string;

  @HasMany(() => UserProjectModel)
  public user_project: UserProjectModel[];
}
