import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';
@Injectable()
export class ShipmentsService {
  constructor(
    @InjectModel(Shipment.name) private readonly shipmentModel: Model<Shipment>,
  ) {}

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
      return await this.shipmentModel.find({ userId }).exec();
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string, userId: string): Promise<Shipment> {
    try {
      return await this.shipmentModel.findOne({ _id: id, userId }).exec();
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    userId: string,
    updateShipmentDto: UpdateShipmentDTO,
  ): Promise<Shipment> {
    try {
      return await this.shipmentModel
        .findOneAndUpdate({ _id: id, userId }, updateShipmentDto, { new: true })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string): Promise<Shipment> {
    try {
      return await this.shipmentModel
        .findOneAndDelete({ _id: id, userId })
        .exec();
    } catch (error) {
      throw error;
    }
  }
}
