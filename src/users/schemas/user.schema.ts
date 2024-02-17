import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '../enums/user-roles.enum'; // Import Role enum
import { Statuses } from '../enums/user-statuses.enum'; // Import Role enum

@Schema({ collection: 'users' })
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop({ required: true, default: Roles.USER }) // Default role is USER
  role: Roles;

  @Prop({ type: String, enum: Statuses, default: Statuses.ACTIVE })
  status: Statuses;
}

export const UserSchema = SchemaFactory.createForClass(User);
