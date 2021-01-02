import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/shared/config/config.module';
import { MailModule } from 'src/shared/mail/mail.module';
import { NotificationModule } from 'src/shared/notification/notification.module';
import { HotelModule } from '../hotel/hotel.module';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';
import { OrderController } from './controllers/order.controller';
import { OrderLine } from './models/order-line.entity';
import { Order } from './models/order.entity';
import { Transaction } from './models/transaction.entity';
import { OrderLineRepository } from './repositories/order-line.repository';
import { OrderRepository } from './repositories/order.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { OrderLineService } from './services/order-line.service';
import { OrderService } from './services/order.service';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderLine,
      Transaction,
      OrderRepository,
      OrderLineRepository,
      TransactionRepository,
    ]),
    forwardRef(() => RoomModule),
    forwardRef(() => HotelModule),
    UserModule,
    NotificationModule,
    ConfigModule,
    MailModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderLineService, TransactionService],
  exports: [OrderService, OrderLineService, TransactionService],
})
export class OrderModule {}
