import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType, Default,
  ForeignKey, HasMany,
  Model,
  PrimaryKey,
  Table, Unique,
} from 'sequelize-typescript';
import { PositionModel } from './position.model';
import { DepartmentModel } from './department.model';
import { ContactModel } from './contact.model';
import { UserProjectModel } from './user_project.model';
import { ParticipantModel } from './participant.model';
import { MessageModel } from './message.model';

@Table({
  tableName: 'user',
  timestamps: false,
})
export class UserModel extends Model<UserModel>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT.UNSIGNED)
  public id: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  public first_name: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  public last_name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(150))
  public email: string;

  @Column(DataType.STRING(500))
  public public_key: string;

  @Default('https://ptetutorials.com/images/user-profile.png')
  @Column(DataType.STRING(300))
  public avatar: string;

  @ForeignKey(()=>DepartmentModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public department_id: number;

  @ForeignKey(()=>PositionModel)
  @Column(DataType.BIGINT.UNSIGNED)
  public position_id: number;

  @BelongsTo(()=>PositionModel)
  public position: PositionModel;

  @BelongsTo(()=>DepartmentModel)
  public department: DepartmentModel;

  @HasMany(()=>ContactModel)
  public contacts: ContactModel[];

  @HasMany(()=> UserProjectModel)
  public user_project: UserProjectModel[];

  @HasMany(()=> ParticipantModel)
  public participants: ParticipantModel[];

  @HasMany(()=>MessageModel,'sender_id')
  public sent_messages: MessageModel[];

  @HasMany(()=>MessageModel,'receiver_id')
  public received_messages: MessageModel[];

}
