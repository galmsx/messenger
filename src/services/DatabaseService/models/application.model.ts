import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { MessageModel } from './message.model';

@Table({
  tableName: 'application',
  timestamps: false,
})
export class ApplicationModel extends Model<ApplicationModel> {
  @PrimaryKey
  @ForeignKey(() => MessageModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public message_id: number;

  @PrimaryKey
  @Column(DataType.STRING(100))
  public link: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  public type: number;

  @BelongsTo(() => MessageModel)
  public message: MessageModel;
}
