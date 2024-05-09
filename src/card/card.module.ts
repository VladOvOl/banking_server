import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from 'src/prisma.service';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  controllers: [CardController],
  providers: [CardService,PrismaService,UtilsService],
    
})
export class CardModule {}
