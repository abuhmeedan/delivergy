import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';

import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class ShipmentsService {
  private readonly kafkaInstance: Kafka;
  private producer: Producer;
  constructor(
    @InjectModel(Shipment.name)
    private readonly shipmentModel?: Model<Shipment>,
  ) {
    this.kafkaInstance = new Kafka({
      clientId: 'SHIPMENT_TRACKER_CLIENT',
      brokers: ['localhost:9092'],
      connectionTimeout: 3000,
      authenticationTimeout: 1000,
      reauthenticationThreshold: 10000,
    });

    this.producer = this.kafkaInstance.producer();
  }

  async create(createShipmentDto: CreateShipmentDTO): Promise<Shipment> {
    try {
      const createdShipment = new this.shipmentModel(createShipmentDto);
      return await createdShipment.save();
    } catch (error) {
      throw error;
    }
  }

  async getAll(userId: string): Promise<Shipment[]> {
    try {
      return await this.shipmentModel.find(userId ? { userId } : {}).exec();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Shipment> {
    try {
      return await this.shipmentModel.findOne({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateShipmentDto: UpdateShipmentDTO,
  ): Promise<Shipment> {
    try {
      return await this.shipmentModel
        .findOneAndUpdate({ _id: id }, updateShipmentDto)
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<Shipment> {
    try {
      return await this.shipmentModel.findOneAndDelete({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }
  async publish(payload: object): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic: 'test',
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
}
