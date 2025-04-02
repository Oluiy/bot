import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  async generatePaymentLink(orderId: number, totalAmount: number, email: string): Promise<string> {
    // Implement integration with Paystack or another payment provider
    // For now, return a dummy link for demonstration
    return `https://paystack.com/pay/order_${orderId}`;
  }
}
