import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsString } from "class-validator";

export class OrderDto {
    @IsString()
    readonly userId: number;

    @IsNotEmpty()
    @IsDecimal()
    totalAmount: number;

    @IsInt()
    quantity: number;

    @IsString()
    deliveryType: undefined;

    @IsDate()
    scheduledTime: Date;

    @IsInt()
    @IsNotEmpty()
    menuItemId: any;
    // @IsDecimal()
    // @IsNotEmpty()
    // readonly totalPrice: number;
} 