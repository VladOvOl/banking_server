import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { RegistrationDto, UpdateDto } from '../auth/dto/auth.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {

  constructor(private prisma : PrismaService){}

  async create(dto: RegistrationDto) {
    const user ={
      email:dto.email,
      name:dto.name,
      password: await hash(dto.password)
    }
    return this.prisma.user.create({
      data:user
    });
  }

  async update(dto: UpdateDto) {
    let passwd:string|undefined=""
    if(dto.password){
      passwd=await hash(dto.password) 
    }else{
      passwd=undefined
    }

    return this.prisma.user.update({
      where: {
        email:dto.email
      },
      data: {
        name:dto.name || undefined,
        phoneNumber:dto.phoneNumber || undefined,
        address:dto.address || undefined,
        password: passwd 
      }
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


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
