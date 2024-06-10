import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreatePaymentDto, CreateTransactionDto, GetAllByCardDto } from './dto/transaction.dto';


@Controller('transaction')
export class TransactionController {
  
  constructor(private readonly transactionService: TransactionService){}

  @Post('create')
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto, 
    @Res({passthrough:true}) 
    res: Response) {
    
    const response = await this.transactionService.create(createTransactionDto)
    return response
  }

  @Post('createPayment')
  async createPayment(
    @Body() dto:  CreatePaymentDto, 
    @Res({passthrough:true}) 
    res: Response) {
    
    const response = await this.transactionService.createPayment(dto)
    return response
  }


  
  
  @Post('getAll')
  async findAllTransactionByCard(
    @Body() getAllTransactionDto: GetAllByCardDto, 
    @Res({passthrough:true}) 
    res: Response) { 

      const response = await this.transactionService.findAllByCard(getAllTransactionDto)
      return response;
  }

  @Post('getAllByUser')
  async findAllTransactionByUser(
    @Body() dto:{cardIds: string[]}){ 

      const response = await this.transactionService.findAllByUser(dto)
      return response;
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
  */
}
