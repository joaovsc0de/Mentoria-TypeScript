import type { IUser} from '@/interfaces/iusers.js'
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Login Usuário', () => {
    
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
        cy.allure().subSuite('Login Usuário');     
        
        cy.allure().epic('Gestão de Usuários');
        cy.allure().feature('Login do Usuário'); 

        cy.allure().owner('João Carneiro'); 
    });

    it('Test Case 2: Login User with correct email and password', () => {

        cy.allure().severity('critical');

        cy.allure().story('Fazer Login com sucesso');

        cy.allure().descriptionHtml('Esse teste valida o sucesso do login com dados corretos.');

        //verificar se home carregou por um elemento
        cy.allure().startStep('Passo 1: Validar carregamento da home');
            cy.verifyText('.features_items', 'Features Items');
        cy.allure().endStep();
        
        //navega pela navbar
        cy.allure().startStep('Passo 2: Navegar para login');
            cy.navigate('/login');
            cy.verifyText('.login-form', 'Login to your account');
        cy.allure().endStep();

        //intercepta a requisição de login
        cy.allure().startStep('Passo 3: Realizar Login');
            cy.intercept('POST', '/login').as('loginRequest');
            //requisição de login
            cy.login(userData.email, userData.password);
            // aguarda a resposta
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
        cy.allure().endStep();

        cy.allure().startStep('Passo 4: Verificar usuário logado');
            cy.verifyLoggedUser(userData.first_name);
        cy.allure().endStep();
    });

    it('Test Case 3: Login User with incorrect email and password', () => {

        cy.allure().severity('normal');

        cy.allure().story('Falha ao fazer login com dados incorretos');

        cy.allure().descriptionHtml('Esse teste valida a falha ao logar com dados incorretos.');

        //verificar se home carregou por um elemento
        cy.allure().startStep('Passo 1: Validar carregamento da home');
            cy.verifyText('.features_items', 'Features Items');
        cy.allure().endStep();

       //navega pela navbar
        cy.allure().startStep('Passo 2: Navegar para login')
            cy.navigate('/login');
            cy.verifyText('.login-form', 'Login to your account');
        cy.allure().endStep();

        //login com dados aleatórios incorretos
        cy.allure().startStep('Passo 3: Logar com dados incorretos');
            cy.login(faker.internet.email(), faker.internet.password());
        cy.allure().endStep();

        //verifica a mensagem de email ou senha incorretos
        cy.allure().startStep('Passo 4: Verificar mensagem de erro')
            cy.verifyText('.login-form', 'Your email or password is incorrect!');
        cy.allure().endStep();

        cy.allure().startStep('Evidência: Erro Dados Incorretos');
            cy.takeEvidence(`erro-dados-incorretos`);
        cy.allure().endStep();
    });

    it('Test Case 4: Logout User', () => {

        cy.allure().severity('critical');

        cy.allure().story('Deslogar usuário com sucesso');

        cy.allure().descriptionHtml('Esse teste valida o fluxo de de login e logout do usuário.');

        //verificar se home carregou por um elemento
        cy.allure().startStep('Passo 1: Validar carregamento da home');
            cy.verifyText('.features_items', 'Features Items');
        cy.allure().endStep();

       //navega pela navbar
        cy.allure().startStep('Passo 2: Navegar para login')
            cy.navigate('/login');
            cy.verifyText('.login-form', 'Login to your account');
        cy.allure().endStep();

        cy.allure().startStep('Passo 3: Fazer Login')
            //intercepta a requisição de login
            cy.intercept('POST', '/login').as('loginRequest');
            //requisição de login
            cy.login(userData.email, userData.password);
            // aguarda a resposta
            cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
        cy.allure().endStep();
        
        cy.allure().startStep('Passo 4: Verificar usuário logado');
            cy.verifyLoggedUser(userData.first_name);
        cy.allure().endStep();

        cy.allure().startStep('Passo 5: Fazer logout e verificar carregamento home');
            cy.navigate('/logout');          
            cy.verifyText('.login-form', 'Login to your account');
        cy.allure().endStep();

        cy.allure().startStep('Evidência: Usuário Deslogado');
            cy.takeEvidence('usuário-deslogado');
        cy.allure().endStep();
    });
});