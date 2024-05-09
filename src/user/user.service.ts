import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegistrationDto, UpdateDto } from '../auth/dto/auth.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {

  constructor(private prisma : PrismaService){}

  async create(dto: RegistrationDto) {
    const user ={
      userEmail:dto.userEmail,
      userFullName:dto.userFullName,
      userPassword: await hash(dto.userPassword)
    }
    return this.prisma.user.create({
      data:user  
    });
  }

  async update(dto: UpdateDto) {
    let passwd:string|undefined=""
    if(dto.userPassword){
      passwd=await hash(dto.userPassword) 
    }else{
      passwd=undefined
    }

    return this.prisma.user.update({
      where: {
        userEmail:dto.userEmail
      },
      data: {
        userFullName:dto.userFullName,
        userPhoneNumber:dto.userPhoneNumber,
        userAddress:dto.userAddress,
        userPassword: passwd 
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

  findOneByEmail(userEmail: string) {
    return this.prisma.user.findUnique({
      where:{
        userEmail
      }

    })
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
