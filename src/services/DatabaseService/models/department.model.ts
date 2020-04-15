import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  tableName: 'department',
  timestamps: false,
})
export class DepartmentModel extends Model<DepartmentModel>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  public id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public title: string;

  @HasMany(()=>UserModel)
  users: UserModel[];
}
