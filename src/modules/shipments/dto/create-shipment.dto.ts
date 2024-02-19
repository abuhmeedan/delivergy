import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateShipmentDTO {
  @IsOptional()
  userId: string;
  @IsObject()
  @IsNotEmpty()
  readonly origin: {
    city: string;
    country: string;
    postalCode: string;
  };

  @IsObject()
  @IsNotEmpty()
  readonly destination: {
    city: string;
    country: string;
    postalCode: string;
  };

  @IsObject()
  @IsNotEmpty()
  readonly deliveryPreferences: {
    deliveryTime: string;
    specialInstructions: string;
    vehicleType: string;
  };
}
