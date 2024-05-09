import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/card.dto';
import * as CryptoJS from 'crypto-js';



@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('createCard')
  async createCard(@Body() createCardDto: CreateCardDto, @Res({passthrough:true}) res: Response) {
    
    const response = await this.cardService.createCard(createCardDto)
    
    return response
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('getAllCards')
  async getAllCards(@Body() getAllCardDto: {userId:number}, @Res({passthrough:true}) res: Response) {
    
    const response = await this.cardService.getAllCards(getAllCardDto)
    
    return response;
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('getOneCards')
  async getOneCards(@Body() dto: {cardNumber:string}, @Res({passthrough:true}) res: Response) {
    
    const response = await this.cardService.findOneByCardNumber(dto)
    
    return response;
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('blockCard')
  async blockCard(
    @Body() dto: {cardNumber:string, cardStatus: boolean}, 
    @Res({passthrough:true}) 
    res: Response) {
    
    const response = await this.cardService.blockCard(dto)
    
    return response;
  }


  @Post('testt')
  update(@Body() dto: {str:string}, @Res({passthrough:true}) res: Response) {
    
    const yourString: string = "Your secret key";

        // Шифрование строки
        const originalMessage: string = dto.str;
        const encryptedMessage: string = CryptoJS.AES.encrypt(originalMessage, yourString).toString();
        
        // Дешифрование строки
        const decryptedMessage: string = CryptoJS.AES.decrypt(dto.str, yourString).toString(CryptoJS.enc.Utf8);
        
        console.log("Original:", originalMessage);
        console.log("Cipher text:", encryptedMessage);
        console.log("Decrypted:", decryptedMessage);
    
    return decryptedMessage;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
