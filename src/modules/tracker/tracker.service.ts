import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { ShipmentsService } from '../shipments/shipments.service';
import { UpdateShipmentDTO } from '../shipments/dto/update-shipment.dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Injectable()
export class TrackerService {
  constructor(private readonly shipmentService: ShipmentsService) {}

  getHello(message: MessageDto, shipmentsService: ShipmentsService): void {
    this.convertToDto(message.location)
      .then((updateShipmentDTO) => {
        console.log(updateShipmentDTO);

        shipmentsService.update(message.id, updateShipmentDTO);
      })
      .catch((errors) => {
        console.error('Validation errors:', errors);
      });
  }
  convertToDto(message: any): Promise<UpdateShipmentDTO> {
    const res = plainToClass(UpdateShipmentDTO, message);
    return validateOrReject(res).then(() => res);
  }
}
