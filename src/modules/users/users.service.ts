import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

import { JWTService } from '../auth/jwt.service';

import { LoginUserDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly model: Model<Users>,
    private jwtService: JWTService,
  ) {}

  public async getOwnProfile(userId: string) {
    return this.model
      .findOne({ id: userId }, { password: 0, __v: 0, _id: 0 })
      .exec();
  }

  public async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.model({
      name,
      email,
      password: hashedPassword,
      id: uuid(),
    });
    return newUser.save();
  }

  public async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.model.findOne({ email }).exec();

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.jwtService.createToken({
        email: user.email,
        role: 'user',
        userId: user.id,
      });
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
