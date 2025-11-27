export interface ICreateOrderPayload {
    userId: number;
    product: string;
    amount: number;
}  

export interface IOrder {
    orderId: string;
    status: string;
    estimatedDelivery: string;
} 