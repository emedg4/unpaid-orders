import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UNPAID_ORDERS } from "./constants/services";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";
import { UnpaidOrderMicroserviceModule } from "./microservices/unpaidOrdersMs.module";
import { UnpaidOrdersController } from "./unpaidOrders.controller";
import { UnpaidOrdersRepository } from "./unpaidOrders.repository";
import { UnpaidOrdersService } from "./unpaidOrders.service";
import { ValidateUnpaidOrderCron } from "./validateUnpaidOrder.service";

@Module({
    imports:[ TypeOrmModule.forFeature([UnpaidOrdersEntity]),
              UnpaidOrderMicroserviceModule.register({
                name: UNPAID_ORDERS
              }),
            ],
    controllers:[UnpaidOrdersController],
    providers:[ UnpaidOrdersRepository,
                UnpaidOrdersService,
                ValidateUnpaidOrderCron],
})
export class UnpaidOrdersModule {}