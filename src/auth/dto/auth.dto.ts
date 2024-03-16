import { IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class LoginDto {

    @IsEmail({}, { message: 'Invalid email message' })
    email:string

    @IsString()
    @MinLength(8,{
        message:"Password must be min 8 char"
    })
    password:string
}

export class RegistrationDto {

    @IsEmail({}, { message: 'Invalid email message' })
    email:string

    @IsString()
    @MinLength(8,{
        message:"Password must be min 8 char"
    })
    password:string

    @IsString()
    @IsNotEmpty({ message: 'Enter you full name' })
    name:string
}

export class UpdateDto {

    @IsEmail({}, { message: 'Invalid email message' })
    email:string

    //@IsString()
    //@MinLength(8,{
    //    message:"Password must be min 8 char"
    // })
    password:string

    //@IsString()
    //@IsNotEmpty({ message: 'Enter your full name' })
    name:string 

    //@IsString()
    //@MinLength(10,{
    //    message:"Phone Number must be min 10 numbers"
    //})
    phoneNumber:string

    //@IsString()
    //@IsNotEmpty({ message: 'Enter your address' })
    address:string
}