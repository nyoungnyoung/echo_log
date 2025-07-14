import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);

    // JWT 토큰  생성
    const payload = {
      sub: user.id,
      userId: user.userId,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        userId: user.userId,
        username: user.username,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUserId(loginDto.userId);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.userId, username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      user: {
        id: user.id,
        userId: user.userId,
        username: user.username,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.userService.findByUserId(userId);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
