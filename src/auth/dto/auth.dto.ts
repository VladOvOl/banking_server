import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class LoginDto {

    @IsEmail({}, { message: 'Invalid email message' })
    userEmail:string

    @IsString()
    @MinLength(8,{
        message:"Password must be min 8 char"
    })
    userPassword:string
}

export class RegistrationDto {

    @IsEmail({}, { message: 'Invalid email message' })
    userEmail:string

    @IsString()
    @MinLength(8,{
        message:"Password must be min 8 char"
    })
    userPassword:string

    @IsString()
    @IsNotEmpty({ message: 'Enter you full name' })
    userFullName:string
}

export class UpdateDto {

    @IsEmail({}, { message: 'Invalid email message' })
    userEmail:string

    @IsString()
    @MinLength(8,{
        message:"Password must be min 8 char"
    })
    userPassword:string

    @IsString()
    //@IsNotEmpty({ message: 'Enter your full name' })
    userFullName:string 

    @IsString()
   // @MinLength(10,{
    //    message:"Phone Number must be min 10 numbers"
   // })
    userPhoneNumber:string

    @IsString()
    //@IsNotEmpty({ message: 'Enter your address' })
    userAddress:string
}