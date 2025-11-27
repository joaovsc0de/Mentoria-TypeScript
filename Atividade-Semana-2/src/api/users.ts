import type { IUser } from '@/interfaces/user.js'
import { formatDate } from '@/utils/formatters.js';
import { isValidEmail } from '@/utils/validations.js';

export const getUserById = async (id: number): Promise<IUser> => {
    const mockedUser: IUser = {
        id: id,
        name: 'João Carneiro',
        email: 'joao.carneiro@t2m.com',
        createdAt: '2025-11-27T12:00:00Z',
    };

    return mockedUser;
};

 export const getFormattedUser = async (id: number): Promise<IUser> => {

        const user = await getUserById(id);

        if (!isValidEmail(user.email)) throw new Error('Email inválido.');

        const formattedUser: IUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: formatDate(user.createdAt),
        }
        
        return formattedUser;
};