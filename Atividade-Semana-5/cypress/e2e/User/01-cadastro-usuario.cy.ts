import type { IUser } from "@/interfaces/iusers.js";

describe('Funcionalidade: Resgistrar Usuário', () => {
    
    let userData: IUser;
       
    before(() => {     
        cy.generateUser().then((user) => {
            userData = user;           
        });
    });

    beforeEach(() => {
        cy.visit('/'); 

        cy.allure().parentSuite('AutomationExercise');
        cy.allure().suite('Usuário');
        cy.allure().subSuite('Cadastrar Usuário');

        cy.allure().epic('Gestão de Usuários');
        cy.allure().feature('Cadastro de Usuário');   
        
        cy.allure().owner('João Carneiro'); 
    });

    it('Test Case 1: Register User', () => {  
        
        cy.allure().severity('critical');
            
        cy.allure().descriptionHtml('Esse teste valida o fluxo de cadastro completo.');

        cy.allure().story('Cadastrar usuário com dados válidos.');
        
        //verificar se home carregou por um elemento
        cy.allure().startStep('Passo 1: Validar carregamento da Home');
            cy.verifyText('.features_items', 'Features Items')
        cy.allure().endStep();
        
        //navega pela navbar e verificar carregamento
        cy.allure().startStep('Passo 2: Navegar para página de login e verificar carregamento');    
            cy.navigate('/login');           
            cy.verifyText('.signup-form', 'New User Signup!');
        cy.allure().endStep();
        
        //Realizar o signup no formulário inicial
        cy.allure().startStep('Passo 3: Realizar Signup');
            //intercepta a requisição signup
            cy.intercept('POST', '/signup').as('signupRequest');
            //executa o botao signup
            cy.signup(userData.first_name, userData.email);
            //aguarda a resposta
            cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
        cy.allure().endStep();

        //Verifica o carregamento da página e registrar usuário
        cy.allure().startStep('Passo 4: Registrar usuário');          
            cy.verifyText('.login-form','Enter Account Information');
            cy.createAccount(userData);      
        cy.allure().endStep();
        
        //Validar usuário logado
        cy.allure().startStep('Passo 5: Validar Usuário logado');
            cy.verifyLoggedUser(userData.first_name);
        cy.allure().endStep();

        cy.allure().startStep('Preencher JSON com dados do usuário criado');
            //escreve o usuário atual no json para utilizar em outros testes
            cy.writeFile('cypress/fixtures/generatedUser.json', userData);   
        cy.allure().endStep();                     
    });

    it('Test Case 5: Register User with existing email', () => {

        cy.allure().severity('critical');

        cy.allure().descriptionHtml('Esse teste valida a mensagem de erro com email já existente para cadastro.');

        cy.allure().story('Cadastrar usuários com dados inválidos/já existentes');

        //verificar se home carregou por um elemento
        cy.allure().startStep('Passo 1: Validar carregamento da Home');
            cy.verifyText('.features_items', 'Features Items');
        cy.allure().endStep();
        
        //navega pela navbar
        cy.allure().startStep('Passo 2: Navegar para página login e validar carregamento');
            cy.navigate('/login');
            cy.verifyText('.signup-form', 'New User Signup!');
        cy.allure().endStep();

        cy.allure().startStep('Passo 3: Preencher formulário Signup com dados incorretos e enviar');
            cy.signup(userData.first_name, userData.email);
        cy.allure().endStep();    

        cy.allure().startStep('Passo 4: Verificar mensagem de erro');
            cy.verifyText('.signup-form', 'Email Address already exist!');
        cy.allure().endStep();

        cy.allure().startStep('Evidência: Erro Email Já Registrado');
                cy.takeEvidence('erro-email-ja-existe');
            // cy.screenshot(`Registrar com email existente/erro email ja existe`);
        cy.allure().endStep();
    });
});