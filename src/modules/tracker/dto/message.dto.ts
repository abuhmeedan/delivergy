export class MessageDto {
  readonly id: string;
  readonly location: {
    latitude: number;
    longitude: number;
  };

  constructor(partial: Partial<MessageDto>) {
    Object.assign(this, partial);
  }
}
