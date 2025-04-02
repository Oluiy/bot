import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByTelegramId(telegramId: string) {
    return this.prisma.user.findUnique({ where: { telegramId } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOrCreateUser(telegramId: string, email: string) {
    let user = await this.findByTelegramId(telegramId);
    if (!user) {
      const existingEmail = await this.findByEmail(email);
      if (existingEmail) {
        throw new Error('Email already registered with another account');
      }
      // user = await this.prisma.user.create({
      //   data: { telegramId, email, verified: false },
      // });
    }
    return user;
  }

  async generateVerificationCode(userId: number): Promise<string> {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpiry = new Date();
    codeExpiry.setMinutes(codeExpiry.getMinutes() + 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { verificationCode, codeExpiry },
    });
    return verificationCode;
  }

  async verifyCode(telegramId: string, code: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({ where: { telegramId } });
    if (!user) throw new NotFoundException('User not found');
    if (!user.verificationCode || !user.codeExpiry || new Date() > user.codeExpiry) {
      return false;
    }
    if (user.verificationCode !== code) {
      return false;
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: { verified: true, verificationCode: null, codeExpiry: null },
    });
    return true;
  }

  async updateUserDetails(userId: number, phoneNumber: string) {
    return this.prisma.user.update({ where: { id: userId }, data: { phoneNumber } });
  }
}
