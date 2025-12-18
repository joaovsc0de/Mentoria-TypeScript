import type { IUser } from "@/interfaces/iusers.js";

describe('Funcionalidade: Deletar usuário', () => {
    
    let userData: IUser;
       
    before(() => {     
       cy.fixture<IUser>('generatedUser').then((data) => {
           userData = data; 
        });       
    });

    beforeEach(() => {
        cy.visit('/');

        cy.allure().parentSuite('AutomationExercise');
        cy.allure().suite('Usuário');
        cy.allure().subSuite('Deletar Usuário');    
        
        cy.allure().epic('Gestão de Usuários');
        cy.allure().feature('Deletar Usuário');
        
        cy.allure().owner('João Carneiro'); 
    });

it('Delete Account', () => {       

        cy.allure().severity('normal');
        
        cy.allure().story('Deletar usuário com sucesso');

        //navega pela navbar
        cy.allure().startStep('Passo 1: navegar para página de login');
            cy.navigate('/login');
            cy.verifyText('.login-form', 'Login to your account');
        cy.allure().endStep();

        //intercepta a requisição de login
        cy.allure().startStep('Passo 2: Realizar login')
            cy.intercept('POST', '/login').as('loginRequest');
            //requisição de login
            cy.login(userData.email, userData.password);
            // aguarda a resposta
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
        cy.allure().endStep();

        cy.allure().startStep('Passo 3: Verificar usuário logado');
            cy.verifyLoggedUser(userData.first_name);
        cy.allure().endStep();

        cy.allure().startStep('Passo 4: Clicar botão deletar conta')
            cy.deleteAccount();
        cy.allure().endStep();
    });

});