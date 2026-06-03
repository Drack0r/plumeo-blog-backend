import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findOneByMail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  login(user: UserDocument): { access_token: string } {
    const payload = {
      sub: user._id,
      role: user.role,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
