import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: ObjectId): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async update(
    id: ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: ObjectId): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
