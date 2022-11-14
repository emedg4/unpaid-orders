import { Controller, Get, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { UNPAID_ORDERS } from "./constants/services";
import { GETALL } from "./constants/uris";
import { UnpaidOrders } from "./dto/unpaidOrder.dto";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";
import { UnpaidOrderMicroserviceService } from "./microservices/unpaidOrders/unpaidOrdersMs.service";
import { UnpaidOrdersService } from "./unpaidOrders.service";

@Controller()
export class UnpaidOrdersController {
    private logger: Logger;
    constructor( private unpaidOrdersService: UnpaidOrdersService,
                 private unpaidOrdersMs: UnpaidOrderMicroserviceService  ){
        this.logger = new Logger(UnpaidOrdersController.name)
    }

    @EventPattern(UNPAID_ORDERS)
    async getNewUnpaidOrder( @Payload() data: UnpaidOrders, @Ctx() context: RmqContext ){
        try {
            const newUnpaidOrder:UnpaidOrdersEntity = await this.unpaidOrdersService.createUnpaidOrder(data);
            this.unpaidOrdersMs.ack(context)
            this.logger.log(`New Order created: ${data.pedido}`)
            
            return newUnpaidOrder;
        } catch (e) {
            this.logger.log(e)
            return;
        }
    }

    @Get(GETALL)
    async getAll(){
        try {
            
            this.logger.log(`All unpaid orders retrieved`)
            return await this.unpaidOrdersService.getAllOrders()
            
        } catch (e) {
            this.logger.error(e)
            return;
        }
    }

}