import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderDto } from '../../src/order/orderdto/order.dto';
import { OrderStatus, PaymentStatus } from '@prisma/client';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(orderData: OrderDto) {
    // Retrieve the price of the menu item
    const menuItem = await this.prisma.menuItem.findUnique({ where: { id: orderData.menuItemId } });
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    
    // Create the order and order item
    const order = await this.prisma.order.create({
      data: {
        userId: orderData.userId,
        totalAmount: orderData.totalAmount,
        paymentStatus: PaymentStatus.PENDING,
        orderStatus: OrderStatus.CREATED,
        deliveryType: orderData.deliveryType,
        scheduledTime: orderData.scheduledTime ? new Date(orderData.scheduledTime) : null,
        orderItems: {
          create: [{
            menuItemId: orderData.menuItemId,
            quantity: orderData.quantity,
            price: menuItem.price,
          }],
        },
      },
      include: { orderItems: true },
    });
    return order;
  }
}
