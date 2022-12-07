import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnpaidOrderMicroserviceService } from './microservices/unpaidOrders/unpaidOrdersMs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const unpaidOrder = app.get<UnpaidOrderMicroserviceService>(UnpaidOrderMicroserviceService)



  const configService = app.get(ConfigService)

  app.connectMicroservice(unpaidOrder.getOptions(configService.get("rbmq.queue.unpaid_orders")))

  await app.startAllMicroservices();
  await app.listen(configService.get("app.port"));
}
bootstrap();
