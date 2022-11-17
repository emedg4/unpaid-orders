import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Dummy1MicroserviceService } from './dummy/microservices/dummy1/dummy1Ms.service';
import { Dummy2MicroserviceService } from './dummy/microservices/dummy2/dummy2Ms.service';
import { Dummy3MicroserviceService } from './dummy/microservices/dummy3/dummy3Ms.service';
import { Dummy4MicroserviceService } from './dummy/microservices/dummy4/dummy4Ms.service';
import { Dummy5MicroserviceService } from './dummy/microservices/dummy5/dummy5Ms.service';
import { UnpaidOrderMicroserviceService } from './unpaid-orders/microservices/unpaidOrders/unpaidOrdersMs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const unpaidOrder = app.get<UnpaidOrderMicroserviceService>(UnpaidOrderMicroserviceService)
  const dummy1 = app.get<Dummy1MicroserviceService>(Dummy1MicroserviceService)
  const dummy2 = app.get<Dummy2MicroserviceService>(Dummy2MicroserviceService)
  const dummy3 = app.get<Dummy3MicroserviceService>(Dummy3MicroserviceService)
  const dummy4 = app.get<Dummy4MicroserviceService>(Dummy4MicroserviceService)
  const dummy5 = app.get<Dummy5MicroserviceService>(Dummy5MicroserviceService)


  const configService = app.get(ConfigService)

  app.connectMicroservice(unpaidOrder.getOptions(configService.get("rbmq.unpaid_orders_queue")))

  app.connectMicroservice(dummy1.getOptions(configService.get("rbmq.dummy1_queue")))
  app.connectMicroservice(dummy2.getOptions(configService.get("rbmq.dummy2_queue")))
  app.connectMicroservice(dummy3.getOptions(configService.get("rbmq.dummy3_queue")))
  app.connectMicroservice(dummy4.getOptions(configService.get("rbmq.dummy4_queue")))
  app.connectMicroservice(dummy5.getOptions(configService.get("rbmq.dummy5_queue")))



  await app.startAllMicroservices();
  await app.listen(configService.get("app.port"));
}
bootstrap();
