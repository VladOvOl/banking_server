import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {

    @IsEmail({}, { message: 'Invalid email message' })
    email:string

    @IsString()
    @MinLength(8,{
        message:"Password must be min 8 char"
    })
    password:string
}
