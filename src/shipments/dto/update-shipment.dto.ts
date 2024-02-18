import { IsObject, IsOptional } from 'class-validator';

export class UpdateShipmentDTO {
  @IsOptional()
  @IsObject()
  readonly deliveryPreferences: {
    deliveryTime: string;
    specialInstructions: string;
    vehicleType: string;
  };
}
