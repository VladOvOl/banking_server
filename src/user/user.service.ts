import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {

  constructor(private prisma : PrismaService){}

  async create(dto: AuthDto) {
    const user ={
      email:dto.email,
      password: await hash(dto.password)
    }
    return this.prisma.user.create({
      data:user
    });
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where:{
        id
      }

    })
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where:{
        email
      }

    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
