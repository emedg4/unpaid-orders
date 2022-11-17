import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UNPAID_ORDERS } from "./constants/services";
import { UnpaidOrders } from "./dto/unpaidOrder.dto";
import { UnpaidOrdersEntity } from "./entities/UnpaidOrders.entity";

@Injectable()
export class UnpaidOrdersRepository {
    constructor(
        @InjectRepository(UnpaidOrdersEntity) private unpaidOrders: Repository<UnpaidOrdersEntity>
    ){}

    async create( data: UnpaidOrders ): Promise<UnpaidOrdersEntity>{
        const createUnpaidOrder: UnpaidOrdersEntity = new UnpaidOrdersEntity();
        createUnpaidOrder.Pedido = data.pedido;
        createUnpaidOrder.FechaCreacion = data.fecha_creacion;
        createUnpaidOrder.Status = data.status_principal;
        createUnpaidOrder.Tienda = data.tienda;
        createUnpaidOrder.Vitrina = data.vitrina;
        createUnpaidOrder.Cliente = data.cliente;

        const createUnpaidOrderObj =  this.unpaidOrders.create(createUnpaidOrder);
        const createdUnpaidOrder: UnpaidOrdersEntity = await this.unpaidOrders.save(createUnpaidOrderObj)

        return createdUnpaidOrder;
    }

    async delete( pedido: string) {
        return await this.unpaidOrders.delete({Pedido: pedido});
    }

    async getAll() {
        return await this.unpaidOrders.find();
    }

}