import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'
import { Category } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getItemsByCategory(category: string) {
    return this.prisma.menuItem.findMany({
      where: {
        category: category as Category,
        available: true,
      },
      include: {
        vendor: { select: { name: true } },
      },
      orderBy: { price: 'asc' },
    });
  }

  async getItemById(id: number) {
    const item = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { vendor: { select: { name: true } } },
    });

    if (!item) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return item;
  }

  async getAvailableCategories() {
    const uniqueCategories = await this.prisma.menuItem.groupBy({
      by: ['category'],
      where: {
        available: true,
      },
    });

    return uniqueCategories.map((c: any) => c.category);
  }

  // Admin methods for managing menu items
  async createMenuItem(data: any) {
    return this.prisma.menuItem.create({ data });
  }

  async updateMenuItem(id: number, data) {
    return this.prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  async toggleItemAvailability(id: number, available: boolean) {
    return this.prisma.menuItem.update({
      where: { id },
      data: { available },
    });
  }
}
