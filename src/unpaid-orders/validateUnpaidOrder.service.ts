import { HttpService } from "@nestjs/axios";
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { Interval } from "@nestjs/schedule";
import { firstValueFrom } from "rxjs";
import { DummyService } from "src/dummy/dummy.service";
import { INGRESADOS, PAGADO, SINPAGAR } from "./constants/Estatus";
import { MODIFY_ORDERS } from "./constants/services";
import { PaidOrder } from "./dto/paidOrder";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";
import { UnpaidOrdersRepository } from "./unpaidOrders.repository";

@Injectable()
export class ValidateUnpaidOrderCron {
    private logger: Logger;
    constructor( private readonly httpService: HttpService,
                 @Inject(forwardRef(()=> DummyService))
                 private dummyService: DummyService,
                 private configService: ConfigService,
                 private unpaidOrdersRepository: UnpaidOrdersRepository,
                 @Inject(MODIFY_ORDERS) private modifyOrdersClient: ClientProxy,
                 ){
        this.logger = new Logger(ValidateUnpaidOrderCron.name);
    }

    @Interval(1000)
    async validateOrders(){
        const allOrders = await this.unpaidOrdersRepository.getAll()


        allOrders.map(async (value: UnpaidOrdersEntity)=> {
            const pedido = value.Pedido
            const messageToInformer = {
                pedido: pedido,
                paso: `Pedido pagado`,
                time:`3000 ms`,
            }
            const response = await firstValueFrom(this.httpService.get(this.configService.get('validateOrders.url')));

            if(response.data == true){
                const response = {
                    pedido: pedido,
                    tenant: null,
                    commingFrom: "UnpaidOrders",
                    queue: 'Unpaid_Orders',
                    data: `Order ${pedido} paid`,
                    status: INGRESADOS,
                    status_pago:"Pagado"
                }

                this.emitToModifyOrders(response)
                this.unpaidOrdersRepository.delete(pedido);
                this.dummyService.emitToInformer(messageToInformer)
            }
            else{
                const messageToInformer = {
                    pedido: pedido,
                    paso: `NO SE HA REALIZADO PAGO DE ESTE PEDIDO`,
                    time:`3000 ms`,
                }
                this.dummyService.emitToInformer(messageToInformer)

            }
        });
        
    }

    public async emitToModifyOrders(data){
        this.modifyOrdersClient.emit(MODIFY_ORDERS, data)
    }
}