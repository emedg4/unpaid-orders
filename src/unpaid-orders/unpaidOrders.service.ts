import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { PAGADO } from "./constants/Estatus";
import { TO_ORDERS_ENGINE } from "./constants/services";
import { ModifiedOrder } from "./dto/modifiedOrder";


@Injectable()
export class UnpaidOrdersService {
    private logger: Logger;
    constructor(
        @Inject( TO_ORDERS_ENGINE ) private ordersEngineClient : ClientProxy
    ){
        this.logger = new Logger(UnpaidOrdersService.name)
    }

    public async processOrder(modifiedOrder: ModifiedOrder){
        const orderToModify: ModifiedOrder = modifiedOrder;
        setTimeout( async () => {
            /**
             * 
             * Now simulate a process where you validate if the
             * order is already paid
             * 
             */
            const isValid: boolean = await this.validateOrder();
            if(isValid == true){
                orderToModify.emmiterData.isDone = true;
                orderToModify.emmiterData.isNew = false;
                orderToModify.order.status_pago = PAGADO;
                orderToModify.order.steps[orderToModify.emmiterData.stepNumber].done = true;
                orderToModify.emmiterData.retry = false;

                await this.ordersEngineClient.emit(TO_ORDERS_ENGINE, orderToModify);

                return
                
            }
            else{
                orderToModify.emmiterData.isDone = false;
                orderToModify.emmiterData.isNew = false;
                orderToModify.order.steps[orderToModify.emmiterData.stepNumber].done = false;
                orderToModify.emmiterData.retry = true;

                await this.ordersEngineClient.emit(TO_ORDERS_ENGINE, orderToModify);

                return
            }
        }, 5000);
    }

    private async validateOrder(): Promise<boolean>{
        const num: number = await Math.floor(Math.random() * 2);
        const response: boolean = num > 1 ? false : true;
        return response

    }
    
}