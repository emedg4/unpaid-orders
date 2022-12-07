import { Controller, Get, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { UNPAID_ORDERS } from "./constants/services";
import { ModifiedOrder } from "./dto/modifiedOrder";
import { UnpaidOrderMicroserviceService } from "../microservices/unpaidOrders/unpaidOrdersMs.service";
import { UnpaidOrdersService } from "./unpaidOrders.service";

@Controller()
export class UnpaidOrdersController {
    private logger: Logger;
    constructor( private unpaidOrdersService: UnpaidOrdersService,
                 private unpaidOrdersMs: UnpaidOrderMicroserviceService  ){
        this.logger = new Logger(UnpaidOrdersController.name)
    }

    @EventPattern(UNPAID_ORDERS)
    async getNewUnpaidOrder( @Payload() payload: ModifiedOrder, @Ctx() context: RmqContext ){
        try {
            const unpaidOrdersServiceResponse = await this.unpaidOrdersService.processOrder(payload);
            this.unpaidOrdersMs.ack(context)            
            return;
        } catch (e) {
            this.logger.log(e)
            return;
        }
    }
}