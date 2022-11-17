import { Controller, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { DUMMY1, DUMMY2, DUMMY3, DUMMY4, DUMMY5 } from "./constants/services";
import { Order } from "./dto/order.dto";
import { DummyService } from "./dummy.service";
import { Dummy1MicroserviceService } from "./microservices/dummy1/dummy1Ms.service";
import { Dummy2MicroserviceService } from "./microservices/dummy2/dummy2Ms.service";
import { Dummy3MicroserviceService } from "./microservices/dummy3/dummy3Ms.service";
import { Dummy4MicroserviceService } from "./microservices/dummy4/dummy4Ms.service";
import { Dummy5MicroserviceService } from "./microservices/dummy5/dummy5Ms.service";

@Controller(DUMMY_URI)
export class DummyController {
    private logger: Logger;
    constructor(private dummyService: DummyService,
                private dummy1Ms: Dummy1MicroserviceService,
                private dummy2Ms: Dummy2MicroserviceService,
                private dummy3Ms: Dummy3MicroserviceService,
                private dummy4Ms: Dummy4MicroserviceService,
                private dummy5Ms: Dummy5MicroserviceService,){

        this.logger = new Logger(DummyController.name)

    }

    @EventPattern(DUMMY1)
    async dummy1controller(@Payload() data:Order, @Ctx() context: RmqContext){
        await this.dummyService.dummy1Process(data);
        this.dummy1Ms.ack(context)
    }
    @EventPattern(DUMMY2)
    async dummy2controller(@Payload() data:Order, @Ctx() context: RmqContext){
        await this.dummyService.dummy2Process(data);
        this.dummy2Ms.ack(context)
    }
    @EventPattern(DUMMY3)
    async dummy3controller(@Payload() data:Order, @Ctx() context: RmqContext){
        await this.dummyService.dummy3Process(data);
        this.dummy3Ms.ack(context)
    }
    @EventPattern(DUMMY4)
    async dummy4controller(@Payload() data:Order, @Ctx() context: RmqContext){
        await this.dummyService.dummy4Process(data);
        this.dummy4Ms.ack(context)
    }
    @EventPattern(DUMMY5)
    async dummy5controller(@Payload() data:Order, @Ctx() context: RmqContext){
        await this.dummyService.dummy5Process(data);
        this.dummy5Ms.ack(context)
    }
}