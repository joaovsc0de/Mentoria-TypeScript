import type { ICreateOrderPayload, IOrder } from "@/interfaces/order.js";
import { formatDate, formatCurrency } from "@/utils/formatters.js";
import { isNonEmptyString } from "@/utils/validations.js";

export const createOrder = async (payload: ICreateOrderPayload): Promise<IOrder> => {

    if(payload.userId <= 0 || !payload.userId) throw new Error('ID do usuário inválido.');

    if(!isNonEmptyString(payload.product)) throw new Error('Produto não inserido.');

    const mockedOrder: IOrder = { 
            orderId: 'a98hds82', 
            status: 'confirmed', 
            estimatedDelivery: '2025-11-27',
    };

    return mockedOrder;
};

export const formatOrder = async (requestPayload: ICreateOrderPayload): Promise<IOrder> => {
     console.log('Preço do pedido: ', formatCurrency(requestPayload.amount));

     const responsePayload = await createOrder(requestPayload);

     const formattedOrderPayload: IOrder = {
            orderId: responsePayload.orderId,
            status: responsePayload.status,
            estimatedDelivery: formatDate(responsePayload.estimatedDelivery),
     }
     
     return formattedOrderPayload;
};