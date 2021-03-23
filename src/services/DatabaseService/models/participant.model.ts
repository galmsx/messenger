import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { ChatModel } from './chat.model';

@Table({
  tableName: 'participant',
  timestamps: false,
})
export class ParticipantModel extends Model<ParticipantModel> {
  @PrimaryKey
  @ForeignKey(() => UserModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public user_id: number;

  @PrimaryKey
  @ForeignKey(() => ChatModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public chat_id: number;

  @Column(DataType.INTEGER)
  public roleId: number;

  @BelongsTo(() => ChatModel)
  public chat: ChatModel;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
