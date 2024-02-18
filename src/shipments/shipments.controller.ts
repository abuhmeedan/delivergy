import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  Patch,
  Query,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { Shipment } from './schemas/shipment.schema';
import { CreateShipmentDTO } from './dto/create-shipment.dto';
import { UpdateShipmentDTO } from './dto/update-shipment.dto';
import { Roles } from '../users/user-roles.decorator';
import { RoleGuard } from '../users/user-roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ShipmentsController {
  constructor(private readonly shipmentService: ShipmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('admin/shipments')
  @Roles('admin')
  async createShipment(
    @Req() request: Request,
    @Body() createShipmentDto: CreateShipmentDTO,
  ): Promise<Shipment> {
    try {
      createShipmentDto.userId = request['user'].userId;
      return await this.shipmentService.create(createShipmentDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create shipment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('admin/shipments')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async getAllShipments(@Query('userId') userId: string): Promise<Shipment[]> {
    try {
      return await this.shipmentService.getAll(userId);
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Failed to fetch shipments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('admin/shipments/:id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async getShipmentById(@Param('id') id: string): Promise<Shipment> {
    try {
      return await this.shipmentService.getById(id);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch shipment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('admin/shipments/:id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async updateShipment(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDTO,
  ): Promise<Shipment> {
    try {
      return await this.shipmentService.update(id, updateShipmentDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update shipment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('admin/shipments/:id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async deleteShipment(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Shipment> {
    try {
      return await this.shipmentService.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete shipment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
