import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Statuses } from '../enums/shipment-statuses.enums';

@Schema({ collection: 'shipments' })
export class Shipment {
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({
    required: true,
    type: {
      city: String,
      country: String,
      postalCode: String,
    },
  })
  origin: object;

  @Prop({
    required: true,
    type: {
      city: String,
      country: String,
      postalCode: String,
    },
  })
  destination: object;

  @Prop({
    required: true,
    type: {
      deliveryTime: String,
      specialInstructions: String,
      vehicleType: String,
    },
  })
  deliveryPreferences: object;

  @Prop({ type: String, enum: Statuses, default: Statuses.PENDING })
  status: Statuses;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);

ShipmentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
