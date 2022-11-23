import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ENDESPACHO, ENPREPARACION, FINALIZADOS, INGRESADOS } from "src/unpaid-orders/constants/Estatus";
import { ValidateUnpaidOrderCron } from "src/unpaid-orders/validateUnpaidOrder.service";
import { DUMMY1, DUMMY2, DUMMY3, DUMMY4, DUMMY5, INFORMER } from "./constants/services";
import { LoggingMessage } from "./dto/loggingMessage";
import { Order } from "./dto/order.dto";

@Injectable()
export class DummyService {
    private logger: Logger;
    constructor( 
        @Inject(forwardRef(() => ValidateUnpaidOrderCron))
        private validateUnpaidOrder: ValidateUnpaidOrderCron,

        @Inject( INFORMER ) private informerClient: ClientProxy){

            this.logger = new Logger(DummyService.name);

        }

    async dummy1Process(data: Order){
        const timeout = await this.getARandomNumber();
          
        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy1",
                queue: DUMMY1,
                data: "Data or whatever you need to do",
                status: INGRESADOS
            }
            const messageToInformer1: LoggingMessage = {
                pedido: data.pedido,
                microservicioOrigen: `SAP`,
                accion: "Recibiendo el pedido en SAP...Procesando ",
                data: `Queue --${DUMMY1}`
            }
            this.informerClient.emit(INFORMER, messageToInformer1)

            this.validateUnpaidOrder.emitToModifyOrders(response)

        }, timeout);
    }

    async dummy2Process(data: Order){
        const timeout = await this.getARandomNumber();

        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy2",
                queue: DUMMY2,
                data: "Data or whatever you need to do",
                status: ENPREPARACION

                
            }
            const messageToInformer1: LoggingMessage = {
                pedido: data.pedido,
                microservicioOrigen: `Facturacion`,
                accion: "Recibiendo el pedido en Facturacion...Procesando ",
                data: `Queue --${DUMMY2}`
            }
    
            this.informerClient.emit(INFORMER, messageToInformer1)

            this.validateUnpaidOrder.emitToModifyOrders(response)

        }, timeout);
    }

    async dummy3Process(data: Order){
        const timeout = await this.getARandomNumber();

        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy3",
                queue: DUMMY3,
                data: "Data or whatever you need to do",
                status: ENPREPARACION

            }
            const messageToInformer1: LoggingMessage = {
                pedido: data.pedido,
                microservicioOrigen: `Revision Sovos`,
                accion: "Recibiendo el pedido en Revision Sovos...Procesando ",
                data: `Queue --${DUMMY3}`
            }
            this.informerClient.emit(INFORMER, messageToInformer1)

            this.validateUnpaidOrder.emitToModifyOrders(response)

        }, timeout);
    }

    async dummy4Process(data: Order){
        const timeout = await this.getARandomNumber();

        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy4",
                queue: DUMMY4,
                data: "Data or whatever you need to do",
                status: ENDESPACHO

            }
            const messageToInformer1: LoggingMessage = {
                pedido: data.pedido,
                microservicioOrigen: `Generar boleta`,
                accion: "Recibiendo el pedido en Generar boleta...Procesando ",
                data: `Queue --${DUMMY4}`
            }
            this.informerClient.emit(INFORMER, messageToInformer1)

            this.validateUnpaidOrder.emitToModifyOrders(response)

        }, timeout);
    }

    async dummy5Process(data: Order){
        const timeout = await this.getARandomNumber();

        setTimeout(() => {
            const response = {
                pedido: data.pedido,
                tenant: data.tenant,
                commingFrom: "Dummy5",
                queue: DUMMY5,
                data: "Data or whatever you need to do",
                status: FINALIZADOS

            }
            const messageToInformer1: LoggingMessage = {
                pedido: data.pedido,
                microservicioOrigen: `Finalizacion de pedido`,
                accion: "Recibiendo el pedido en Finalizacion de pedido...Procesando ",
                data: `Queue --${DUMMY5}`
            }
            this.informerClient.emit(INFORMER, messageToInformer1)

            this.validateUnpaidOrder.emitToModifyOrders(response)            

        }, timeout);
    }

    async getARandomNumber(){
        return Math.floor(Math.random() * 10000);
    }

}