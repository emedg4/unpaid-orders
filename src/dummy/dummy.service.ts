import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ENDESPACHO, ENPREPARACION, FINALIZADOS, INGRESADOS } from "src/unpaid-orders/constants/Estatus";
import { ValidateUnpaidOrderCron } from "src/unpaid-orders/validateUnpaidOrder.service";
import { DUMMY1, DUMMY2, DUMMY3, DUMMY4, DUMMY5, INFORMER } from "./constants/services";
import { Order } from "./dto/order.dto";

@Injectable()
export class DummyService {
    private logger: Logger;
    constructor( private validateUnpaidOrder: ValidateUnpaidOrderCron,

        @Inject( INFORMER ) private informerMS: ClientProxy){

            this.logger = new Logger(DummyService.name);

        }

    async dummy1Process(data: Order){
        const timeout = await this.getARandomNumber();
        const messageToInformer = {
            pedido: data.pedido,
            paso: `Pedido pasando por dummy1`,
            time:`Se tomaran ${timeout} ms para terminar este proceso`,
        }
        
        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy1",
                queue: DUMMY1,
                data: "Data or whatever you need to do",
                status: INGRESADOS
            }

            this.validateUnpaidOrder.emitToModifyOrders(response)
            this.emitToInformer(messageToInformer)
        }, timeout);
    }

    async dummy2Process(data: Order){
        const timeout = await this.getARandomNumber();
        const messageToInformer = {
            pedido: data.pedido,
            paso: `Pedido pasando por dummy2`,
            time:`Se tomaran ${timeout} ms para terminar este proceso`,
        }
        
        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy2",
                queue: DUMMY2,
                data: "Data or whatever you need to do",
                status: ENPREPARACION

                
            }

            this.validateUnpaidOrder.emitToModifyOrders(response)
            this.emitToInformer(messageToInformer)

        }, timeout);
    }

    async dummy3Process(data: Order){
        const timeout = await this.getARandomNumber();
        const messageToInformer = {
            pedido: data.pedido,
            paso: `Pedido pasando por dummy3`,
            time:`Se tomaran ${timeout} ms para terminar este proceso`,
        }
        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy3",
                queue: DUMMY3,
                data: "Data or whatever you need to do",
                status: ENPREPARACION

            }

            this.validateUnpaidOrder.emitToModifyOrders(response)
            this.emitToInformer(messageToInformer)

        }, timeout);
    }

    async dummy4Process(data: Order){
        const timeout = await this.getARandomNumber();
        const messageToInformer = {
            pedido: data.pedido,
            paso: `Pedido pasando por dummy4`,
            time:`Se tomaran ${timeout} ms para terminar este proceso`,
        }
        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy4",
                queue: DUMMY4,
                data: "Data or whatever you need to do",
                status: ENDESPACHO

            }

            this.validateUnpaidOrder.emitToModifyOrders(response)
            this.emitToInformer(messageToInformer)

        }, timeout);
    }

    async dummy5Process(data: Order){
        const timeout = await this.getARandomNumber();
        const messageToInformer = {
            pedido: data.pedido,
            paso: `Pedido pasando por dummy5`,
            time:`Se tomaran ${timeout} ms para terminar este proceso`,
        }

        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy5",
                queue: DUMMY5,
                data: "Data or whatever you need to do",
                status: FINALIZADOS

            }

            this.validateUnpaidOrder.emitToModifyOrders(response)
            this.emitToInformer(messageToInformer)
            

        }, timeout);
    }

    async getARandomNumber(){
        return Math.floor(Math.random() * 20000);
    }

    async emitToInformer(messageToInformer){
        this.informerMS.emit(INFORMER, messageToInformer);
        return
    }
}