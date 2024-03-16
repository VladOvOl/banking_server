import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegistrationDto, UpdateDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {

  EXPIRE_DAY_REFRESH_TOKEN = 1 
  REFRESH_TOKEN_NAME='refreshToken'

  constructor(
    private userService : UserService,
    private jwt : JwtService
    ){}

  async registrationUser(dto: RegistrationDto) {

    const finedUser = await this.userService.findOneByEmail(dto.email)
    
    if(finedUser) throw new BadRequestException("User already exist")

    const {password, ...user} = await this.userService.create(dto)

    const tokens = await this.generateTokens(user.id)
    return {
      user,
      ...tokens
    };

  }

  async updateUser(dto: UpdateDto) {

    const finedUser = await this.userService.findOneByEmail(dto.email)
    
    if(!finedUser) throw new BadRequestException("User dont find")

    const {password, ...user} = await this.userService.update(dto)

    const tokens = await this.generateTokens(user.id)
    return {
      user,
      ...tokens
    };

  }

  async loginUser(dto: LoginDto) {

    const {password, ...user} = await this.validateUser(dto)
    const tokens = await this.generateTokens(user.id)
    return {
      user,
      ...tokens
    };
  }

  async generateTokens(userId:number){
    const data = {id:userId}

    const accessToken = this.jwt.sign(data,{
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data,{
      expiresIn: '1d'
    })

    return {accessToken, refreshToken}
  }

 async getNewTokens(refreshToken:string){
  const result = await this.jwt.verifyAsync(refreshToken)
  if(!result){
    throw new UnauthorizedException('Invalid refresh token')
  }

  const {password, ...user} = await this.userService.findOne(result.id)

  const tokens = this.generateTokens(user.id)

  return{
    user,
    ...tokens
  }
 }


  private async validateUser(dto:LoginDto){
    const user = await this.userService.findOneByEmail(dto.email)

    if(!user)throw new NotFoundException("User not found")

    const isValid = await verify(user.password, dto.password)

    if(!isValid) throw new NotFoundException("Invalid password")

    return user
  }

  addRefreshTokenToResponse(res:Response, refreshToken:string){
    const expiresIn = new Date()
    expiresIn.setHours(expiresIn.getHours()+this.EXPIRE_DAY_REFRESH_TOKEN)
    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken,{
      httpOnly:true,
      domain: 'localhost',
      expires:expiresIn,
      secure:true,
      sameSite:'none'

    })
  }

  removeRefreshTokenToResponse(res:Response){

    res.cookie(this.REFRESH_TOKEN_NAME, '',{
      httpOnly:true,
      domain: 'localhost',
      expires:new Date(0),
      secure:true,
      sameSite:'none'

    })
  }


}
