import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ChatModel } from './chat.model';
import { UserModel } from './user.model';
import { ApplicationModel } from './application.model';

@Table({
  tableName: 'message',
  timestamps: true,
})
export class MessageModel extends Model<MessageModel>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  public id: number;

  @Column(DataType.STRING(1000))
  public content: number;

  @ForeignKey(()=>ChatModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public chat_id: number;

  @ForeignKey(()=>UserModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public receiver_id: number;

  @ForeignKey(()=>UserModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public sender_id: number;

  @Column(DataType.INTEGER)
  public status: number;

  @BelongsTo(()=>ChatModel)
  public chat: number;

  @BelongsTo(()=> UserModel,'sender_id')
  public sender: UserModel;

  @BelongsTo(()=>UserModel,'receiver_id')
  public receiver: UserModel;

  @HasMany(()=>ApplicationModel)
  public applications: ApplicationModel[];
}
