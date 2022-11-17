import { Module } from "@nestjs/common";
import { DUMMY1, DUMMY2, DUMMY3, DUMMY4, DUMMY5, INFORMER } from "./constants/services";
import { Dummy1MicroserviceModule } from "./microservices/dummy1/dummy1Ms.module";
import { Dummy2MicroserviceModule } from "./microservices/dummy2/dummy2Ms.module";
import { Dummy3MicroserviceModule } from "./microservices/dummy3/dummy3Ms.module";
import { Dummy4MicroserviceModule } from "./microservices/dummy4/dummy4Ms.module";
import { Dummy5MicroserviceModule } from "./microservices/dummy5/dummy5Ms.module";
import { DummyController } from "./dummy.controller";
import { DummyService } from "./dummy.service";
import { UnpaidOrdersModule } from "src/unpaid-orders/unpaidOrders.module";
import { InformerMicroserviceModule } from "src/microservices/dummy5/informerMs.module";

@Module({
    imports:[
        Dummy1MicroserviceModule.register({
            name: DUMMY1
        }),
        Dummy2MicroserviceModule.register({
            name: DUMMY2
        }),
        Dummy3MicroserviceModule.register({
            name: DUMMY3
        }),
        Dummy4MicroserviceModule.register({
            name: DUMMY4
        }),
        Dummy5MicroserviceModule.register({
            name: DUMMY5
        }),
        InformerMicroserviceModule.register({
            name: INFORMER
        }),
        UnpaidOrdersModule
    ],
    controllers:[DummyController],
    providers:[DummyService],
    exports:[DummyService]
})
export class DummyModule {}