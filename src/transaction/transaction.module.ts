import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../prisma.service';
import { UtilsService } from '../utils/utils.service';


@Module({
  controllers: [TransactionController],
  providers: [TransactionService,PrismaService,UtilsService],
 
})
export class TransactionModule {}
