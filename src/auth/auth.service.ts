import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user || user.password !== password) return false;

    return user;
  }

  getJwtTokenByUser(user: User) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async registerUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    return this.getJwtTokenByUser(newUser);
  }
}
