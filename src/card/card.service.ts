import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCardDto, ValidateCardDto } from './dto/card.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { UtilsService } from 'src/utils/utils.service';


@Injectable()
export class CardService {

  constructor
    (private prisma : PrismaService,
     private utils: UtilsService
    ){}

  async createCard(createCardDto: CreateCardDto) {
    const randomId = this.utils.randomGenerator()

    const card = {
      id: randomId,
      cardTitle: createCardDto.cardTitle,
      cardUserFullName: createCardDto.cardUserFullName,
      cardNumber: createCardDto.cardNumber,
      cardDateMonth: createCardDto.cardDateMonth,
      cardDateYear: createCardDto.cardDateYear,
      cardUserPinCode: await hash(createCardDto.cardUserPinCode.toString()),
      cardCVC: this.utils.encrypt(createCardDto.cardCVC.toString(), randomId),
      cardBalance: createCardDto.cardBalance,
      cardStatus: createCardDto.cardStatus,
      userId: createCardDto.userId,
    }
    return this.prisma.card.create({
      data:card
    })

  }

  async getAllCards(dto : {userId:number}) {
    let userId = Number(dto.userId)
    return this.prisma.card.findMany({
      where:{
        userId : userId
      },
    });
  }

  async findOneByCardNumber(dto:{cardNumber:string}) {
    const response =  await  this.prisma.card.findFirstOrThrow({
      where:{
        cardNumber: dto.cardNumber
      },     
    }).catch(() => { throw new BadRequestException("Card don`t find")})

    console.log(response)
    return response
  }

  async blockCard(dto:{cardNumber:string,cardStatus:boolean}){

    const response = await this.prisma.card.update({
      where:{
        cardNumber: dto.cardNumber
      },
      data:{
        cardStatus: dto.cardStatus
      }
    })
    return response
  }

  
  

  /*async validateCard(dto: ValidateCardDto){

    const card = await this.cardService.findOneByCardNumber(dto)
    if(!card)throw new BadRequestException("Card not found")

    const isValidMonth = card.cardDateMonth === dto.cardDateMonth
    if(!isValidMonth) throw new BadRequestException("Month not good")

    const isValidYear = card.cardDateMonth === dto.cardDateMonth
    if(!isValidYear) throw new BadRequestException("Month not good")
    
  }*/j

  update(id: number, updateCardDto: any) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }

 
}
