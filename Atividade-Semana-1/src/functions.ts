import type {User} from "./interfaces"
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true, eot: true })

let users: User[] = [
    { id: 1, name: "João", age: 27, isActive: true },
    { id: 2, name: "Lara", age: 25, isActive: false},
    { id: 3, name: "Jose", age: 21, isActive: true },
    { id: 4, name: "Rodrigo", age: 29, isActive: false },
    { id: 5, name: "Duf", age: 32, isActive: true },
];

export const addUser = (user: User) => {
    user.id = users.length + 1;
    users.push(user);
    console.log("Usuário adicionado a lista.");
}

export const getUserByName = (name: string ) => {
    const user = users.find( u => u.name === name);
    if(!user){
        console.log("Usuário não encontrado.");
        return;
    }
        console.log(user, "\n");
}

export const getActiveUsers = () => {
    const activeUsers = users.filter(u =>  u.isActive);
    if(activeUsers.length === 0){
        console.log("Nenhum usuário ativo encontrado.\n");
        return;
    }
    console.log(activeUsers, "\n");   
}

export const updateAgeById = (id: number, age: number) => {
    const index = users.findIndex(u => u.id === id);
    if(index === -1) {
    console.log(`Nenhum usuário com id = ${id} encontrado.\n`);
    return;
    }
       
    users[index].age = age;
    console.log(`Idade do usuário com id ${id} atualizada para ${age} anos.\n`);
}

export const readUser = ():User  => {
    
    let age = parseInt(prompt("Digite a idade: "));
    while (isNaN(age)) {
        age = parseInt(prompt("Idade inválida. Digite um número: "));
    }

    const user: User = {
        id: 0,
        name: prompt('Digite o Nome: '),
        age: age,
        isActive: true,
    }
    return user;
}

export const menu = () => {
    let opcao: string;
    do{       
        console.log("------- MENU -------");
        console.log("1 - Adicionar novo usuário");
        console.log("2 - Buscar usuário pelo nome");
        console.log("3 - Listar usuários ativos");
        console.log("4 - Atualizar idade por ID");
        console.log("0 - Sair");
        console.log("---------------------");

    opcao = prompt("Digite uma opção: ");

    switch(opcao){
        case '1':
            addUser(readUser());
        break;

        case '2':
            const name = prompt("Digite o nome: ");
            getUserByName(name);
        break;

        case '3':
            getActiveUsers();
        break;

        case '4':
            const id = parseInt(prompt("Digite o id: "));
            const age = parseInt(prompt("Digite o idade: "));

            if (isNaN(id) || isNaN(age)) {
                    console.log("Valores inválidos.\n");
                    break;
                }

            updateAgeById(id, age);
        break;

        case '0':
            console.log("Encerrando o sistema.");
            break;

        default:    
            console.log("Opção inválida!\n");
    }
}
while(opcao !== '0');
}
