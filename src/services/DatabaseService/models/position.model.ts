import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  tableName: 'position',
  timestamps: false,
})
export class PositionModel extends Model<PositionModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  public id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public title: string;

  @HasMany(() => UserModel)
  users: UserModel[];
}
