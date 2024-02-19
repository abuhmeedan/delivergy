import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ParseMessagePipe implements PipeTransform<any, MessageDto> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(rawMessage: any, metadata: ArgumentMetadata): MessageDto {
    const { id, location } = rawMessage;

    const parsedMessage = new MessageDto({ id, location });

    return parsedMessage;
  }
}
