import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { UnpaidOrdersModule } from './unpaid-orders/unpaidOrders.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }),
  UnpaidOrdersModule,
            ],
  controllers: [],
  providers: [],
})
export class AppModule {}
