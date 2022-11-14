import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Interval } from "@nestjs/schedule";
import { firstValueFrom } from "rxjs";
import { INGRESADOS, PAGADO, SINPAGAR } from "./constants/Estatus";
import { MODIFY_ORDERS } from "./constants/services";
import { PaidOrder } from "./dto/paidOrder";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";
import { UnpaidOrdersRepository } from "./unpaidOrders.repository";

@Injectable()
export class ValidateUnpaidOrderCron {
    private logger: Logger;
    constructor( private readonly httpService: HttpService,
                 @Inject(MODIFY_ORDERS) private modifyOrdersClient: ClientProxy,
                 private configService: ConfigService,
                 private unpaidOrdersRepository: UnpaidOrdersRepository){
        this.logger = new Logger(ValidateUnpaidOrderCron.name);
    }

    @Interval(1000)
    async validateOrders(){
        const allOrders = await this.unpaidOrdersRepository.getAll()


        allOrders.map(async (value: UnpaidOrdersEntity)=> {
            const pedido = value.Pedido
            const response = await firstValueFrom(this.httpService.get(this.configService.get('validateOrders.url')));
            if(response.data == true){
                const pedidoPagado: PaidOrder = {
                    pedido: pedido,
                    status: {
                        status: INGRESADOS,
                        nuevo: PAGADO,
                        previo: SINPAGAR
                    }
                }

                this.modifyOrdersClient.emit(MODIFY_ORDERS, pedidoPagado)
                this.logger.log(`Pedido ${pedidoPagado.pedido} pagado`)

                this.unpaidOrdersRepository.delete(pedido);
            }
        });
        
    }
}