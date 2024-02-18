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
  origin: {
    city: string;
    country: string;
    postalCode: string;
  };

  @Prop({
    required: true,
    type: {
      city: String,
      country: String,
      postalCode: String,
    },
  })
  destination: {
    city: string;
    country: string;
    postalCode: string;
  };

  @Prop({
    required: true,
    type: {
      defaultDeliveryTime: String,
      specialInstructions: String,
      preferredCarrier: String,
    },
  })
  deliveryPreferences: {
    deliveryTime: string;
    specialInstructions: string;
    vehicleType: string;
  };

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
