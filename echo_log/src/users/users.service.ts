import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    // 중복 사용자 ID 체크
    const existingUser = await prisma.user.findUnique({
      where: { userId: createUserDto.userId },
    });

    if (existingUser) {
      throw new ConflictException('User ID already exists');
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return prisma.user.create({
      data: {
        userId: createUserDto.userId,
        password: hashedPassword,
        username: createUserDto.username,
      },
      select: {
        id: true,
        userId: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        password: false, // 비밀번호는 응답에서 제외
      },
    });
  }

  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        userId: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUserId(userId: string) {
    return prisma.user.findUnique({
      where: { userId },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 사용자 존재 여부 확인
    await this.findOne(id);

    const updateData: Partial<{ username: string; password: string }> = {};

    if (updateUserDto.username) {
      updateData.username = updateUserDto.username;
    }

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        userId: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return prisma.user.delete({
      where: { id },
      select: {
        id: true,
        userId: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });
  }
}
