import { Injectable, Logger } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { UnpaidOrdersRepository } from "./unpaidOrders.repository";

@Injectable()
export class ValidateUnpaidOrderCron {
    private logger: Logger;
    constructor( private unpaidOrdersRepository: UnpaidOrdersRepository){
        this.logger = new Logger(ValidateUnpaidOrderCron.name);
    }

    @Interval(1000)
    async validateOrders(){
        console.log( await this.unpaidOrdersRepository.getAll() )
    }
}