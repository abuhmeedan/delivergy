import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum'; // Import Role enum

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

  @Prop({ required: true, default: Role.USER }) // Default role is USER
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
