// import type { IUser} from '@/interfaces/iusers.js'
// import { faker } from '@faker-js/faker';

// describe('Test Cases - Automation Exercise', () => {
//     let userData: IUser;
    
//     beforeEach(() => {
//         cy.visit('/');         
//     });
    
//     before(() => {
//         cy.fixture<IUser>('generatedUser').then((data) => {
//            userData = data; 
//         });      
//         cy.allure().parentSuite('Usuários');
//         cy.allure().suite('Cadastro');
//         cy.allure().subSuite('Fluxo positivo');
//     });

    // it('Test Case 1: Register User', () => {  

    //     //1. METADADOS: Organizção Hierárquica
    //     cy.allure().epic('Usuários');
    //     cy.allure().feature('Funcionalidade de Cadastro');
    //     cy.allure().story('Registrar novo usuário com sucesso');

    //     //2. CLASSIFICAÇÃO: Severidade e Responsável
    //     cy.allure().severity('critical');
    //     cy.allure().owner('João Carneiro');
    //     cy.allure().tag('smoke_test', 'regressivo');

    //     cy.allure().descriptionHtml('Esse teste valida o fluxo de cadastro completo.')
    //     //usuário gerado dinamicamente
    //     cy.generateUser().then((user) => {
    //     userData = user;

    //     //verificar se home carregou por um elemento
    //     cy.allure().startStep('Passo 1: Validar carregamento da Home');
    //         cy.verifyText('.features_items', 'Features Items')
    //     cy.allure().endStep();
        
    //     //navega pela navbar e verificar carregamento
    //     cy.allure().startStep('Passo 2: Navegar para página de login e verificar carregamento');    
    //         cy.navigate('/login');           
    //         cy.verifyText('.signup-form', 'New User Signup!');
    //     cy.allure().endStep();
        
    //     //Realizar o signup no formulário inicial
    //     cy.allure().startStep('Passo 3: Realizar Signup');
    //         //intercepta a requisição signup
    //         cy.intercept('POST', '/signup').as('signupRequest');
    //         //executa o botao signup
    //         cy.signup(user.first_name, user.email);
    //         //aguarda a resposta
    //         cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
    //     cy.allure().endStep();

    //     //Verifica o carregamento da página e registrar usuário
    //     cy.allure().startStep('Passo 4: Registrar usuário');          
    //         cy.verifyText('.login-form','Enter Account Information');
    //         cy.createAccount(user);
    //         cy.verifyText('.title.text-center', "Account Created!");       
    //     cy.allure().endStep();
        
    //     //Evidência da conta criada
    //     cy.allure().startStep('Evidência: Conta Criada');
    //         cy.screenshot(`Registrar Usuário/conta criada`, {capture: 'viewport'});
    //         cy.allure().attachment('Registrar Usuário', 'cypress/screenshots/tests.cy.ts/Registrar Usuário/conta criada.png', 'image/png');    
    //     cy.allure().endStep();
        
    //     //botão continue da mensagem Accounte Creatted"
    //     cy.get('[data-qa="continue-button"]').click();

    //     //Validar usuário logado
    //     cy.allure().startStep('Passo 5: Validar Usuário logado');
    //         cy.verifyLoggedUser(user.first_name).screenshot(`Registrar Usuário/usuário logado`);
    //         cy.allure().attachment('Usário Logado', 'cypress/screenshots/tests.cy.ts/Registrar Usuário/usuário logado.png', 'image/png');
    //     cy.allure().endStep();

    //     //escreve o usuário atual no json para utilizar em outros testes
    //     cy.writeFile('cypress/fixtures/generatedUser.json', userData);

    //     });                    
    // });

    // it('Test Case 2: Login User with correct email and password', () => {

    //     //verificar se home carregou por um elemento
    //     cy.get('.features_items')
    //       .should('be.visible')
    //       .contains('h2', 'Features Items');
        
    //     //navega pela navbar
    //     cy.navigate('/login');
    //     cy.verifyText('.login-form', 'Login to your account');

    //     //intercepta a requisição de login
    //     cy.intercept('POST', '/login').as('loginRequest');

    //     //requisição de login
    //     cy.login(userData.email, userData.password);

    //     // aguarda a resposta
    //     cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    //     cy.verifyLoggedUser(userData.first_name);

    //     cy.screenshot(`Logar Usuário/usuario logado`, {
    //         capture: 'viewport'
    //     });

    // });

    // it('Test Case 3: Login User with incorrect email and password', () => {
    //     //verificar se home carregou por um elemento
    //     cy.get('.features_items')
    //       .should('be.visible')
    //       .contains('h2', 'Features Items');

    //     //navega pela navbar
    //     cy.navigate('/login');
    //     cy.verifyText('.login-form', 'Login to your account');

    //     //login com dados aleatórios incorretos
    //     cy.login(faker.internet.email(), faker.internet.password());

    //     //verifica a mensagem de email ou senha incorretos
    //     cy.verifyText('.login-form', 'Your email or password is incorrect!');
    //     cy.screenshot(`Logar com dados errados/erro dados incorretos`);
    // });

    // it('Test Case 4: Logout User', () => {
    //     //verificar se home carregou por um elemento
    //     cy.get('.features_items')
    //       .should('be.visible')
    //       .contains('h2', 'Features Items');

    //     //navega pela navbar
    //     cy.navigate('/login');
    //     cy.verifyText('.login-form', 'Login to your account');

    //     //intercepta a requisição de login
    //     cy.intercept('POST', '/login').as('loginRequest');
        
    //     //requisição de login
    //     cy.login(userData.email, userData.password);

    //     // aguarda a resposta
    //     cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
        
    //     cy.verifyLoggedUser(userData.first_name);
    //     cy.screenshot(`Logar e Deslogar Usuário/usuario logado`, {
    //         capture: 'viewport'
    //     });

    //     //navega pela navbar
    //     cy.navigate('/logout');          
    //     cy.verifyText('.login-form', 'Login to your account');

    //     cy.screenshot(`Logar e Deslogar Usuário/usuario deslogado`);
    //     });

    // it('Test Case 5: Register User with existing email', () => {

    //     //verificar se home carregou por um elemento
    //     cy.get('.features_items')
    //       .should('be.visible')
    //       .contains('h2', 'Features Items');

    //     //navega pela navbar
    //     cy.navigate('/login');
    //     cy.verifyText('.signup-form', 'New User Signup!');

    //     cy.signup(userData.first_name, userData.email);    

    //     cy.verifyText('.signup-form', 'Email Address already exist!');
    //     cy.screenshot(`Registrar com email existente/erro email ja existe`);
    // });

    // it('Delete Account', () =>{
        
    //     //navega pela navbar
    //     cy.navigate('/login');
    //     cy.verifyText('.login-form', 'Login to your account');

    //     //intercepta a requisição de login
    //     cy.intercept('POST', '/login').as('loginRequest');
        
    //     //requisição de login
    //     cy.login(userData.email, userData.password);

    //     // aguarda a resposta
    //     cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
        
    //     cy.verifyLoggedUser(userData.first_name);

    //     cy.deleteAccount();
    // });

// });