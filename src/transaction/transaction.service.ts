import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto, CreateTransactionDto, GetAllByCardDto } from './dto/transaction.dto';
import { PrismaService } from '../prisma.service';
import { UtilsService } from '../utils/utils.service';


@Injectable()
export class TransactionService {

  constructor(
    private prisma : PrismaService,
    private utils : UtilsService
  ){}

  create(dto: CreateTransactionDto) {
    console.log(dto)
    try {
      return this.prisma.$transaction(
        async (tx) => {
          // 1. Checking for equals cards
          if(dto.userRecipientCardNumber === dto.userSenderCardNumber){
            throw new BadRequestException("Cards must not be equals")
          }
          // 2. Verify having card sender's in database
          const validateCardSender = await this.prisma.card.findFirstOrThrow({
            where:{
              cardNumber: dto.userSenderCardNumber
          }}).catch(()=>{throw new BadRequestException("Card sender doesn`t find")})
          // 3. Verify having card recipient's in database
          const validateCardRecipient = await this.prisma.card.findFirstOrThrow({
            where:{
              cardNumber: dto.userRecipientCardNumber
          }}).catch(()=>{throw new BadRequestException("Card recipient doesn`t find")})         
 
          const isValidMonth = validateCardSender.cardDateMonth == dto.userSenderCardMonth
          if(!isValidMonth) throw new BadRequestException("Month not good")
      
          const isValidYear = validateCardSender.cardDateYear == dto.userSenderCardYear
          if(!isValidYear) throw new BadRequestException("Month not good")

         // 4. Decrement amount from the sender.
         const sender = await tx.card.updateMany({
           data: {
             cardBalance: {
               decrement: dto.value,
             },
           },
           where: {
             cardNumber: 	dto.userSenderCardNumber,
           },
         })

         // 5. Verify that the sender's balance didn't go below zero.
         const cardSender = await tx.card.findFirst({
           where:{
             cardNumber: dto.userSenderCardNumber
           }
         })

         if(cardSender.cardStatus === false){
            throw new BadRequestException(`${cardSender.cardUserFullName} 
            card is blocked`)
         }

         if (cardSender.cardBalance < 0) {
           throw new BadRequestException(`${cardSender.cardUserFullName} 
           doesn't have enough to send`)
         }

         const isValidCVC = this.utils.decrypt(validateCardSender.cardCVC, cardSender.id) == dto.userSenderCardCVC
         if(!isValidCVC) throw new BadRequestException("CVC not good!")
            
         // 6. Increment the recipient's balance by amount
         const recipient = await tx.card.updateMany({
           data: {
             cardBalance: {
               increment: dto.value,
             },
           },
           where: {
             cardNumber: dto.userRecipientCardNumber,
           },
         })

         const cardReceiver = await tx.card.findFirst({
          where:{
            cardNumber: dto.userRecipientCardNumber
          }
        })
 
         const transactionSend = await tx.cardTransaction.create({
           data:{
             userRecipientCardNumber: cardReceiver.cardNumber,
             userRecipientFullName: cardReceiver.cardUserFullName,
             userSenderCardNumber: cardSender.cardNumber,
             userSenderFullName: cardSender.cardUserFullName,
             value:dto.value,
             process:'-',
             cardId:cardSender.id,
             typeTransaction:"transfer"
           }
         })
 
         const transactionReceive = await tx.cardTransaction.create({
           data:{
            userRecipientCardNumber: cardReceiver.cardNumber,
             userRecipientFullName: cardReceiver.cardUserFullName,
             userSenderCardNumber: cardSender.cardNumber,
             userSenderFullName: cardSender.cardUserFullName,
             value:dto.value,
             process:'+',
             cardId:cardReceiver.id,
             typeTransaction:"transfer"
           }
         })
         return [transactionSend,transactionReceive , sender, recipient]
       }
     )
    } catch (error) {
      console.log(error)
    }
  }

  createPayment(dto: CreatePaymentDto) {
    console.log(dto)
    try {
      return this.prisma.$transaction(
        async (tx) => {

          // 1. Checking for equals cards
          if(dto.userRecipientCardNumber === dto.userSenderCardNumber){
            throw new BadRequestException("Cards must not be equals")
          }

          // 2. Verify having card sender's in database
          const validateCardSender = await this.prisma.card.findFirstOrThrow({
            where:{
              cardNumber: dto.userSenderCardNumber
          }}).catch(()=>{throw new BadRequestException("Card sender doesn`t find")})
               
          const isValidMonth = validateCardSender.cardDateMonth == dto.userSenderCardMonth
          if(!isValidMonth) throw new BadRequestException("Month not good")
      
          const isValidYear = validateCardSender.cardDateYear == dto.userSenderCardYear
          if(!isValidYear) throw new BadRequestException("Month not good")

          

         // 4. Decrement amount from the sender.
         const sender = await tx.card.updateMany({
           data: {
             cardBalance: {
               decrement: dto.value,
             },
           },
           where: {
             cardNumber: 	dto.userSenderCardNumber,
           },
         })

     
         // 5. Verify that the sender's balance didn't go below zero.
         const cardSender = await tx.card.findFirst({
           where:{
             cardNumber: dto.userSenderCardNumber
           }
         })

         if(cardSender.cardStatus === false){
            throw new BadRequestException(`${cardSender.cardUserFullName} 
            card is blocked`)
         }

         if (cardSender.cardBalance < 0) {
           throw new BadRequestException(`${cardSender.cardUserFullName} 
           doesn't have enough to send`)
         }

         const isValidCVC = this.utils.decrypt(validateCardSender.cardCVC, cardSender.id) == dto.userSenderCardCVC

         console.log(validateCardSender.cardCVC)
         console.log(dto.userSenderCardCVC)
         console.log(this.utils.decrypt(validateCardSender.cardCVC, cardSender.id))
         console.log(this.utils.decrypt(dto.userSenderCardCVC, cardSender.id))

          if(!isValidCVC) throw new BadRequestException("CVC not good!")
        
         const transactionSend = await tx.cardTransaction.create({
           data:{
             userRecipientCardNumber: dto.userRecipientCardNumber,
             userRecipientFullName: dto.userRecipientCardName,
             userSenderCardNumber: cardSender.cardNumber,
             userSenderFullName: cardSender.cardUserFullName,
             value:dto.value,
             process:'-',
             cardId:cardSender.id,
             typeTransaction: dto.typeTransaction
           }
         })
 
         
         return [transactionSend, sender]
       }
     )
    } catch (error) {
      console.log(error)
     
    }
  }

  findAllByCard(dto:GetAllByCardDto) {
    return this.prisma.cardTransaction.findMany({
      where:{
        cardId:dto.cardId
      }
    })
  }

  findAllByUser(dto:{cardIds: string[]}){

    return this.prisma.cardTransaction.findMany({
      where:{
        cardId:{in:dto.cardIds}
      }
    })
  }

  /*
  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }*/
}
