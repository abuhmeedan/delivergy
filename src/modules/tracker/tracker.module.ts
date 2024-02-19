import { Module } from '@nestjs/common';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';
import { ShipmentsService } from '../shipments/shipments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShipmentSchema } from '../shipments/schemas/shipment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shipment', schema: ShipmentSchema }]),
  ],
  controllers: [TrackerController],
  providers: [TrackerService, ShipmentsService],
})
export class TrackerModule {}
