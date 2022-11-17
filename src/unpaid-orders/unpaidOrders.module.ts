import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DummyModule } from "src/dummy/dummy.module";
import { MODIFY_ORDERS, UNPAID_ORDERS } from "./constants/services";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";
import { ModifyOrderMicroserviceModule } from "./microservices/modifyOrders/modifyOrderMs.module";
import { UnpaidOrderMicroserviceModule } from "./microservices/unpaidOrders/unpaidOrdersMs.module";
import { UnpaidOrdersController } from "./unpaidOrders.controller";
import { UnpaidOrdersRepository } from "./unpaidOrders.repository";
import { UnpaidOrdersService } from "./unpaidOrders.service";
import { ValidateUnpaidOrderCron } from "./validateUnpaidOrder.service";

@Module({
    imports:[ TypeOrmModule.forFeature([UnpaidOrdersEntity]),
              UnpaidOrderMicroserviceModule.register({
                name: UNPAID_ORDERS
              }),
              ModifyOrderMicroserviceModule.register({
                name: MODIFY_ORDERS
              }),
              HttpModule, DummyModule,
            ],
    controllers:[UnpaidOrdersController],
    providers:[ UnpaidOrdersRepository,
                UnpaidOrdersService,
                ValidateUnpaidOrderCron],
    exports:[UnpaidOrdersService,UnpaidOrdersRepository]
})
export class UnpaidOrdersModule {}