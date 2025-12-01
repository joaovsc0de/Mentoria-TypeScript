import type { IUser} from '@/interfaces/iusers.js'

describe('Test Cases - Automation Exercise', () => {
    let userData: IUser;

    before(() => {
        cy.fixture<IUser>('user').then((data) => {
            userData = data;
        });
    });

    beforeEach(() =>{
        cy.visit('https://automationexercise.com/');
    });

    it.only('Test Case 1: Register User', () => {
        cy.get('img[src="/static/images/home/logo.png"]').should('be.visible');
        cy.navigate('/login');
        cy.verifyVisibleText('New User Signup!');
        cy.fillSignupDetails(userData.first_name, userData.email);
        cy.registerAccount(userData);
        cy.verifyLoggedUser(userData.first_name);
        cy.deleteAccount();
    });

    it('Test Case 2: Login User with correct email and password', () => {
        cy.navigate('/login');
        cy.verifyVisibleText('Login to your account');
        cy.login(userData.email, userData.password);
        cy.verifyLoggedUser(userData.first_name);
        cy.deleteAccount();
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.navigate('/login');
        cy.verifyVisibleText('Login to your account');
        cy.login('incorrect@email.com', 'incorrectpassword');
        cy.verifyVisibleText('Your email or password is incorrect');
    });

    it('Test Case 4: Logout User', () => {
        cy.navigate('/login');
        cy.login(userData.email, userData.password);
        cy.verifyLoggedUser(userData.first_name);
        cy.navigate('/logout');
        cy.verifyVisibleText('Login to your account');
    });

    it('Test Case 5: Register User with existing email', () => {
        cy.navigate('/login');
        cy.verifyVisibleText('New User Signup!');
        cy.fillSignupDetails(userData.first_name, userData.email);
        cy.verifyVisibleText('Email Address already exist!');
    });
});