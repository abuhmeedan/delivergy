import { IsObject, IsOptional } from 'class-validator';

export class UpdateShipmentDTO {
  @IsObject()
  @IsOptional()
  readonly origin: {
    city: string;
    country: string;
    postalCode: string;
  };

  @IsObject()
  @IsOptional()
  readonly destination: {
    city: string;
    country: string;
    postalCode: string;
  };

  @IsOptional()
  @IsObject()
  readonly deliveryPreferences: {
    deliveryTime: string;
    specialInstructions: string;
    vehicleType: string;
  };

  @IsOptional()
  @IsObject()
  readonly location: {
    latitude: number;
    longitude: number;
  };

  readonly feedback: string;
}
