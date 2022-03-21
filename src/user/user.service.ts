import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(payload: object): Promise<UserModel> {
    try {
      const user = await this.userModel.findOne(payload);

      if (!user) return null;

      return user as unknown as Promise<UserModel>;
    } catch (err) {
      throw new HttpException('Something Went Wrong', 500);
    }
  }
}
