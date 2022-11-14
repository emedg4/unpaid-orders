import { Injectable, Logger } from "@nestjs/common";
import { UnpaidOrders } from "./dto/unpaidOrder.dto";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";
import { UnpaidOrdersRepository } from "./unpaidOrders.repository";

@Injectable()
export class UnpaidOrdersService {
    private logger: Logger;
    constructor( private unpaidOrdersRepository: UnpaidOrdersRepository){
        this.logger = new Logger(UnpaidOrdersService.name)
    }

    async createUnpaidOrder( order: UnpaidOrders ): Promise<UnpaidOrdersEntity> {
        const createOrder: UnpaidOrdersEntity = await this.unpaidOrdersRepository.create(order)

        this.logger.log(`Created Order ${order.pedido}`)
        return createOrder;
    }

    async deleteUnpaidOrder( order: string ) {
        await this.unpaidOrdersRepository.delete(order)

        this.logger.log(`Deleted Order ${order}`)
        return
    }

    async getAllOrders(){
        return await this.unpaidOrdersRepository.getAll()
    }
}