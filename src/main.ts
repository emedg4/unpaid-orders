import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnpaidOrderMicroserviceService } from './unpaid-orders/microservices/unpaidOrdersMs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const unpaidOrder = app.get<UnpaidOrderMicroserviceService>(UnpaidOrderMicroserviceService)
  const configService = app.get(ConfigService)

  app.connectMicroservice(unpaidOrder.getOptions(configService.get("rbmq.unpaid_orders_queue")))



  await app.startAllMicroservices();
  await app.listen(configService.get("app.port"));
}
bootstrap();
