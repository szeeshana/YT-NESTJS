import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  register(registerUser: CreateAuthDto) {
    return this.userService.create(registerUser);
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneBy({
      select: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
      where: { email: email },
    });

    if (user?.password !== md5(pass)) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync({ password, ...result }),
    };
  }
}
