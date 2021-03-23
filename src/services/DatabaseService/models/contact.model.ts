import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({
  tableName: 'contact',
  timestamps: false,
})
export class ContactModel extends Model<ContactModel> {
  @PrimaryKey
  @ForeignKey(() => UserModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public user_id: number;

  @Column(DataType.BIGINT.UNSIGNED)
  public contact_id: number;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
