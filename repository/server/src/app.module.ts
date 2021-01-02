import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttributeModule } from './modules/attribute/attribute.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { OrderModule } from './modules/order/order.module';
import { ProvinceModule } from './modules/province/province.module';
import { RoomModule } from './modules/room/room.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './shared/auth/auth.module';
import { ConfigModule } from './shared/config/config.module';
import { ConfigService } from './shared/config/config.service';
import { MailModule } from './shared/mail/mail.module';
import { NotificationModule } from './shared/notification/notification.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const {host, port, name, password, user} = configService.databaseConfig;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    UserModule,
    AuthModule,
    UploadModule,
    HotelModule,
    RoomModule,
    OrderModule,
    ProvinceModule,
    AttributeModule,
    MailModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
