import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma.service';
import { UtilsService } from 'src/utils/utils.service';


@Module({
  controllers: [TransactionController],
  providers: [TransactionService,PrismaService,UtilsService],
 
})
export class TransactionModule {}
