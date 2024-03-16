import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto ,RegistrationDto, UpdateDto} from './dto/auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('registrationUser')
  async registrationUser(@Body() dto: RegistrationDto, @Res({passthrough:true}) res: Response){
    const {refreshToken,...response} = await this.authService.registrationUser(dto)
    this.authService.addRefreshTokenToResponse(res,refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('loginUser')
  async loginUser(@Body() dto: LoginDto, @Res({passthrough:true}) res: Response){
    const {refreshToken,...response} = await this.authService.loginUser(dto)
    this.authService.addRefreshTokenToResponse(res,refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('updateUser')
  async updateUser(@Body() dto: UpdateDto, @Res({passthrough:true}) res: Response){
    const {refreshToken,...response} = await this.authService.updateUser(dto)
    this.authService.addRefreshTokenToResponse(res,refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('logoutUser')
  async logoutUser(@Res({passthrough:true}) res: Response){
    this.authService.removeRefreshTokenToResponse(res)

    return true 
  }

  @HttpCode(200)
  @Post('loginUser/access-token')
  async getNewTokens(@Req() req: Request,@Res({passthrough:true}) res: Response ){
    const refreshTokenFromCookies = await req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if(!refreshTokenFromCookies){
      this.authService.removeRefreshTokenToResponse(res)
      throw new UnauthorizedException('Refresh token not passed')
    }

    const{refreshToken,...response} = await this.authService.getNewTokens(refreshTokenFromCookies)

    return response
  }

}
