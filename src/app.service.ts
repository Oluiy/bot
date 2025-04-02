import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, PrismaClient } from '@prisma/client';
// import { MenuService } from './menu/menu.service';

interface createMenu  {
  id : number,
  name: string,
  price: number,
  category: Category,
  vendorId: string,
}

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private db: PrismaClient,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }



  async createMenuItem(items : createMenu) {
    const item = await this.prisma.menuItem.create({
      data: {
        id: items.id,
        name: items.name,
        price: items.price,
        category: items.category,
        vendorId: items.vendorId,
      }
    });
    return item;
  }


  async getItems() {
    const items = await this.prisma.menuItem.findMany({
      // where: {menu: MenuService}
    })
  }
}
