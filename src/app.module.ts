import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CardModule,
    TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
