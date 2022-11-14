import { DynamicModule, Module } from '@nestjs/common';
import { ModifyOrderMicroserviceService } from './modifyOrderMs.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

interface RmqModuleOptions {
  name: string
}

@Module({
  providers: [ModifyOrderMicroserviceService],
  exports: [ModifyOrderMicroserviceService]
})
export class ModifyOrderMicroserviceModule {
  static register({ name }: RmqModuleOptions ): DynamicModule {
    return {
      module: ModifyOrderMicroserviceModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('rbmq.url')],
                queue: configService.get<string>('rbmq.modify_order_queue')
              },
            }),
            inject: [ConfigService]
          }
        ])
      ],
      exports: [ClientsModule]
    }
  }
}
