import { Module } from "@nestjs/common";
import { TO_ORDERS_ENGINE, UNPAID_ORDERS } from "./constants/services";
import { UnpaidOrderMicroserviceModule } from "../microservices/unpaidOrders/unpaidOrdersMs.module";
import { UnpaidOrdersController } from "./unpaidOrders.controller";
import { UnpaidOrdersService } from "./unpaidOrders.service";
import { OrderLifeCycleModule } from "src/microservices/orderLifeCycle/orderLifeCycle.module";

@Module({
    imports:[UnpaidOrderMicroserviceModule.register({
                name: UNPAID_ORDERS
              }),
             OrderLifeCycleModule.register({
              name: TO_ORDERS_ENGINE
             })],
    controllers:[UnpaidOrdersController],
    providers:[UnpaidOrdersService,
                ],

    exports:[UnpaidOrdersService]
})
export class UnpaidOrdersModule {}