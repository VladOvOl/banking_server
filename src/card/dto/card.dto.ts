import {IsNotEmpty, IsNumber, Max, Min, MinLength, isNotEmpty} from "class-validator";

export class CreateCardDto {
  

  @IsNotEmpty()
  cardTitle:string

  @IsNotEmpty()
  cardUserFullName: string

  @IsNotEmpty()
  @MinLength(16,{
    message: "Card number must has 16 numbers"
  })
  cardNumber : string
  
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  cardDateMonth: number

  @IsNotEmpty()
  @IsNumber()
  cardDateYear: number
  
  @IsNotEmpty()
  cardUserPinCode:number

  @IsNotEmpty()
  cardCVC:number

  @IsNotEmpty()
  cardBalance:number

  @IsNotEmpty()
  cardStatus:boolean

  @IsNotEmpty()
  userId: number

}

export class ValidateCardDto{
 
  @IsNotEmpty()
  @MinLength(16,{
    message: "Card number must has 16 numbers"
  })
  cardNumber : string
  
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  cardDateMonth: number

  @IsNotEmpty()
  @IsNumber()
  cardDateYear: number

  @IsNotEmpty()
  cardCVC:number
  
}