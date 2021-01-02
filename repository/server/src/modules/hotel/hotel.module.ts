import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModule } from '../review/review.module';
import { RoomModule } from '../room/room.module';
import { HotelController } from './controllers/hotel.controller';
import { Hotel } from './models/hotel.entity';
import { HotelRepository } from './repositories/hotel.repository';
import { HotelService } from './services/hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel, HotelRepository]),
    forwardRef(() => ReviewModule),
    forwardRef(() => RoomModule),
  ],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
