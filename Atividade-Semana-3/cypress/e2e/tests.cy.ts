import type { IUser} from '@/interfaces/iusers.js'

describe('Test Cases - Automation Exercise', () => {
    
    it.only('Test Case 1: Register User', () => {

         cy.fixture<IUser>('user').then((userData) => {

            //HomePage
            cy.visit('https://automationexercise.com/');
            cy.get('header img[alt="Website for automation practice"]').should('be.visible');

            //LoginPage
            cy.get('a[href="/login"]').first().click();
            cy.contains('New User Signup!').should('be.visible');
            
            cy.get('input[data-qa="signup-name"]')
            .type(userData.first_name)
            .should('have.value', userData.first_name);
            
            cy.get('input[data-qa="signup-email"]')
            .type(userData.email)
            .should('have.value', userData.email);
            
            cy.get('button[data-qa="signup-button"]').click();

            //SignupFormPage
            cy.contains('Enter Account Information').should('be.visible');

            //Account Details
            cy.get(`input[id='id_gender${userData.title}']`)
            .check()
            .should('be.checked');

            cy.get('input[data-qa="password"]')
            .type(userData.password)
            .should('have.value', userData.password);

            cy.get('select[data-qa="days"]')
            .select(userData.birth_day)
            .should('have.value', userData.birth_day);

            cy.get('select[data-qa="months"]')
            .select(userData.birth_month)
            .should('have.value', userData.birth_month);

            cy.get('select[data-qa="years"]')
            .select(userData.birth_year)
            .should('have.value', userData.birth_year);

            //CheckBox
            cy.get('input[id="newsletter"]')
            .check()
            .should('be.checked');

            cy.get('input[id="optin"]')
            .check()
            .should('be.checked');

            //Personal Information
            cy.get('input[data-qa="first_name"]')
            .type(userData.first_name)
            .should('have.value', userData.first_name);

            cy.get('input[data-qa="last_name"]')
            .type(userData.last_name)
            .should('have.value', userData.last_name);

            cy.get('input[data-qa="company"]')
            .type(userData.company)
            .should('have.value', userData.company);

            //Adress
            cy.get('input[data-qa="address"]')
            .type(userData.address)
            .should('have.value', userData.address);

            cy.get('input[data-qa="address2"]')
            .type(userData.address2)
            .should('have.value', userData.address2);

            cy.get('select[data-qa="country"]')
            .select(userData.country)
            .should('have.value', userData.country);

            cy.get('input[data-qa="state"]')
            .type(userData.state)
            .should('have.value', userData.state);

            cy.get('input[data-qa="city"]')
            .type(userData.city)
            .should('have.value', userData.city);

            cy.get('input[data-qa="zipcode"]')
            .type(userData.zipcode)
            .should('have.value', userData.zipcode);

            cy.get('input[data-qa="mobile_number"]')
            .type(userData.mobile_number)
            .should('have.value', userData.mobile_number);;

            //Submit account creation
            cy.get('button[data-qa="create-account"]').click();

            //Verify account creation
            cy.contains("Account Created!").should('be.visible');
            cy.get('a[data-qa="continue-button"]').click();

            //Verify Login
            cy.get('header')
            .contains(`Logged in as ${userData.first_name}`)
            .should('be.visible');
            
            //Verify Delete account
            cy.get('a[href="/delete_account"]').click();
            cy.get('h2[data-qa="account-deleted"]').should('be.visible');
            cy.get('a[data-qa="continue-button"]').click();
        });        
    });

    it('Test Case 2: Login User with correct email and password', () => {

        cy.fixture<IUser>('user').then((userData) => {

            //HomePage
            cy.visit('https://automationexercise.com/');
            cy.get('header img[alt="Website for automation practice"]').should('be.visible');

            //LoginPage
            cy.get('a[href="/login"]').first().click();
            cy.contains('Login to your account').should('be.visible');

            cy.get('input[data-qa="login-email"]')
            .type(userData.email)
            .should('have.value', userData.email);
            
            cy.get('input[data-qa="login-password"]')
            .type(userData.password)
            .should('have.value', userData.password);

            cy.get('button[data-qa="login-button"]').click();

            //Verify logged user
            cy.get('header')
            .contains(`Logged in as ${userData.first_name}`)
            .should('be.visible');

            //Delete Account
            cy.get('a[href="/delete_account"]').click();
            cy.get('h2[data-qa="account-deleted"]').should('be.visible');
            cy.get('a[data-qa="continue-button"]').click();
       
        });
    });

    it('Test Case 3: Login User with incorrect email and password', () => {

            //HomePage
            cy.visit('https://automationexercise.com/');
            cy.get('header img[alt="Website for automation practice"]').should('be.visible');

            //LoginPage
            cy.get('a[href="/login"]').first().click();
            cy.contains('Login to your account').should('be.visible');

            cy.get('input[data-qa="login-email"]')
            .type('wrong@email.com')
            .should('have.value', 'wrong@email.com');
            
            cy.get('input[data-qa="login-password"]')
            .type('wrongpassword')
            .should('have.value', 'wrongpassword');

            cy.get('button[data-qa="login-button"]').click();

            //Verify error message
            cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Test Case 4: Logout User', () => {

         cy.fixture<IUser>('user').then((userData) => {

            //HomePage
            cy.visit('https://automationexercise.com/');
            cy.get('header img[alt="Website for automation practice"]').should('be.visible');

            //LoginPage
            cy.get('a[href="/login"]').first().click();
            cy.contains('Login to your account').should('be.visible');

            cy.get('input[data-qa="login-email"]')
            .type(userData.email)
            .should('have.value', userData.email);
            
            cy.get('input[data-qa="login-password"]')
            .type(userData.password)
            .should('have.value', userData.password);

            cy.get('button[data-qa="login-button"]').click();

            //Verify logged user
            cy.get('header')
            .contains(`Logged in as ${userData.first_name}`)
            .should('be.visible');

            //Logout Account
            cy.get('a[href="/logout"]').click();
            
            //Verify Login Page
            cy.contains('Login to your account').should('be.visible');
       
        });
    });

    it('Test Case 5: Register User with existing email', () => {

        cy.fixture<IUser>('user').then((userData) => {

            //HomePage
            cy.visit('https://automationexercise.com/');
            cy.get('header img[alt="Website for automation practice"]').should('be.visible');

            //LoginPage
            cy.get('a[href="/login"]').first().click();
            cy.contains('New User Signup!').should('be.visible');
            
            cy.get('input[data-qa="signup-name"]')
            .type(userData.first_name)
            .should('have.value', userData.first_name);
            
            cy.get('input[data-qa="signup-email"]')
            .type(userData.email)
            .should('have.value', userData.email);
            
            cy.get('button[data-qa="signup-button"]').click();

            //Verify error message
            cy.contains('Email Address already exist!').should('be.visible');

        });
    });

});