import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ParticipantModel } from './participant.model';
import { MessageModel } from './message.model';

@Table({
  tableName: 'chat',
  timestamps: false,
})
export class ChatModel extends Model<ChatModel> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  public id: number;

  @Column(DataType.TEXT)
  public title: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public type: number;

  @HasMany(() => ParticipantModel)
  public participants: ParticipantModel[];

  @HasMany(() => MessageModel)
  public messages: MessageModel[];
}
