import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { ShipmentSchema } from './schemas/shipment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ShipmentsController],
  providers: [ShipmentsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Shipment', schema: ShipmentSchema }]),
  ],
})
export class ShipmentsModule {}
