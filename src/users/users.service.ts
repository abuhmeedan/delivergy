import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './enums/user-roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: hashedPassword,
      role: Roles.USER,
      // Set other fields here
    });
    const emailduplicate = await this.findByEmail(createdUser.email);
    if (emailduplicate) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Email already exists! please try to login',
      });
    }
    try {
      const user = await createdUser.save();
      // Remove password before returning (for safety)
      delete user.password;
      return user;
    } catch (error) {
      // Handle error (e.g., unique email constraint violation)
      throw error;
    }
  }
  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { status: updateUserDto.status },
      {
        new: true,
      },
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
  async findById(_id: string): Promise<User | null> {
    return await this.userModel.findOne({ _id });
  }
}
