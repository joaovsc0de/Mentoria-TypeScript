import { getFormattedUser } from '@/api/users.js';
import { formatOrder } from '@/api/orders.js';
import type { ICreateOrderPayload } from '@/interfaces/order.js';

const main = async () => {
    try {

        const requestPayload: ICreateOrderPayload = { 
            userId: 1, 
            product: 'HeadSet Gamer', 
            amount: 349.90
        };

        console.log('Dados do usuário:', await getFormattedUser(requestPayload.userId));
        console.log('Dados do pedido:', await formatOrder(requestPayload));
    } catch (error) {
        console.error(error);
    }
};

main();