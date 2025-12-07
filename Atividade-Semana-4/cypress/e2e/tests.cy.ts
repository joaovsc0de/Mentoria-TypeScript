import type { IUser} from '@/interfaces/iusers.js'
import { faker } from '@faker-js/faker';

describe('Test Cases - Automation Exercise', () => {
    let userData: IUser;
    
    beforeEach(() => {
        cy.visit('/');         
    });
    
    before(() => {
        cy.fixture<IUser>('generatedUser').then((data) => {
           userData = data; 
        });      
    });

    it('Test Case 1: Register User', () => {  
        cy.generateUser().then((user) => {
            userData = user;
        cy.get('.features_items').should('be.visible').contains('h2', 'Features Items');
        cy.navigate('/login');           
        cy.verifyText('.signup-form', 'New User Signup!');
        cy.signup(user.first_name, user.email);
        cy.verifyText('.login-form','Enter Account Information');
        cy.createAccount(user);
        cy.verifyText('.title.text-center', "Account Created!");
        cy.screenshot(`Registrar Usuário/conta criada`, {
            capture: 'viewport'
        });
        cy.get('[data-qa="continue-button"]').click();
        cy.verifyLoggedUser(user.first_name).screenshot(`Registrar Usuário/usuário logado`);
        cy.writeFile('cypress/fixtures/generatedUser.json', userData);
        // cy.deleteAccount();  
        });     
                  
    });

    it.only('Test Case 2: Login User with correct email and password', () => {
        cy.get('.features_items').should('be.visible').contains('h2', 'Features Items');
        cy.navigate('/login');
        cy.verifyText('.login-form', 'Login to your account');
        cy.login(userData.email, userData.password);
        cy.verifyLoggedUser(userData.first_name);
        cy.screenshot(`Logar Usuário/usuario logado`, {
            capture: 'viewport'
        });
        cy.deleteAccount();
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.get('.features_items').should('be.visible').contains('h2', 'Features Items');
        cy.navigate('/login');
        cy.verifyText('.login-form', 'Login to your account');
        cy.login(faker.internet.email(), faker.internet.password());
        cy.verifyText('.login-form', 'Your email or password is incorrect!');
        cy.screenshot(`Logar com dados errados/erro dados incorretos`);
    });

    it('Test Case 4: Logout User', () => {
        cy.get('.features_items').should('be.visible').contains('h2', 'Features Items');
        cy.navigate('/login');
        cy.verifyText('.login-form', 'Login to your account');
        cy.login(userData.email, userData.password);
        cy.verifyLoggedUser(userData.first_name);
        cy.screenshot(`Logar e Deslogar Usuário/usuario logado`, {
            capture: 'viewport'
        });
        cy.navigate('/logout');          
        cy.verifyText('.login-form', 'Login to your account');
        cy.screenshot(`Logar e Deslogar Usuário/usuario deslogado`);
        });

    it('Test Case 5: Register User with existing email', () => {
        cy.get('.features_items').should('be.visible').contains('h2', 'Features Items');
        cy.navigate('/login');
        cy.verifyText('.signup-form', 'New User Signup!'); 
        cy.signup(userData.first_name, userData.email);       
        cy.verifyText('.signup-form', 'Email Address already exist!');
        cy.screenshot(`Registrar com email existente/erro email ja existe`);
    });

});