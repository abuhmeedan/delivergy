import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrackerService } from './tracker.service';
import { ParseMessagePipe } from './parse-message.pipe';
import { ShipmentsService } from '../shipments/shipments.service';

@Controller()
export class TrackerController {
  constructor(
    private readonly consumerService: TrackerService,
    private readonly shipmentsService: ShipmentsService,
  ) {}

  @MessagePattern('test')
  getHello(@Payload(new ParseMessagePipe()) message): void {
    return this.consumerService.getHello(message, this.shipmentsService);
  }
}
