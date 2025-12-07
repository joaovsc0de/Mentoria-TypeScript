/// <reference types="cypress" />

import type { IUser } from "@/interfaces/iusers.js";
import { faker } from '@faker-js/faker';

Cypress.Commands.add('deleteAccount', () => {
        cy.get('[href="/delete_account"]').click();
        cy.get('[data-qa="account-deleted"]').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
});

Cypress.Commands.add('verifyLoggedUser', (name: string) => {
        cy.get('header')
        .should('be.visible')
        .contains(`Logged in as ${name}`);
});

Cypress.Commands.add('createAccount', (userData: IUser) => {
        cy.get(`#id_gender${userData.title}`)
          .check()
          .should('be.checked');
        
        cy.get('[data-qa="password"]')
          .type(userData.password)
          .should('have.value', userData.password);
        
        cy.get('[data-qa="days"]')
          .select(userData.birth_day)
          .should('have.value', userData.birth_day);
        
        cy.get('[data-qa="months"]')
          .select(userData.birth_month)
          .should('have.value', userData.birth_month);
        
        cy.get('[data-qa="years"]')
          .select(userData.birth_year)
          .should('have.value', userData.birth_year);
        
                    //CheckBox
        cy.get('#newsletter')
          .check()
          .should('be.checked');
        
        cy.get('#optin')
          .check()
          .should('be.checked');
        
                    //Personal Information
        cy.get('[data-qa="first_name"]')
          .type(userData.first_name)
          .should('have.value', userData.first_name);
        
        cy.get('[data-qa="last_name"]')
          .type(userData.last_name)
          .should('have.value', userData.last_name);
        
        cy.get('[data-qa="company"]')
          .type(userData.company)
          .should('have.value', userData.company);
        
                    //Adress
        cy.get('[data-qa="address"]')
          .type(userData.address)
          .should('have.value', userData.address);
        
        cy.get('[data-qa="address2"]')
          .type(userData.address2)
          .should('have.value', userData.address2);            
        
        cy.get('[data-qa="country"]')
          .select(userData.country)
          .should('have.value', userData.country);
        
        cy.get('[data-qa="state"]')
          .type(userData.state)
          .should('have.value', userData.state);
        
        cy.get('[data-qa="city"]')
          .type(userData.city)
          .should('have.value', userData.city);
        
        cy.get('[data-qa="zipcode"]')
          .type(userData.zipcode)
          .should('have.value', userData.zipcode);
        
        cy.get('[data-qa="mobile_number"]')
          .type(userData.mobile_number)
          .should('have.value', userData.mobile_number);;
        
                    //Submit account creation
        cy.get('[data-qa="create-account"]').click();
});

Cypress.Commands.add('signup', (name: string, email: string) => {
        cy.get('[data-qa="signup-name"]')
          .type(name)
          .should('have.value', name);
            
        cy.get('[data-qa="signup-email"]')
          .type(email)
          .should('have.value', email);
            
        cy.get('[data-qa="signup-button"]').click();
});

Cypress.Commands.add('navigate', (page: string) => {
        cy.get(`.nav.navbar-nav [href="${page}"]`).click();
});

Cypress.Commands.add('verifyText', (seletor: string, text: string) => {
        cy.get(`${seletor}`).should('be.visible').contains(text);
});

Cypress.Commands.add('login', (email: string, password: string) => {
        cy.get('[data-qa="login-email"]')
          .type(email)
          .should('have.value', email);
            
        cy.get('[data-qa="login-password"]')
          .type(password)
          .should('have.value', password);

        cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('generateUser', () => {
        
        const countries = [
                'India',
                'United States',
                'Canada',
                'Australia',
                'Israel',
                'New Zealand',
                'Singapore'
        ];

        return cy.fixture('user').then((user) => {
           const userData: IUser = {
                ...user,
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birth_day: faker.number.int({ min: 1, max: 31 }),
                birth_month: faker.number.int({ min: 1, max: 12 }),
                birth_year: faker.number.int({ min: 1950, max: 2021 }).toString(),
                company: faker.company.name(),
                address: faker.location.streetAddress(),
                address2: faker.location.secondaryAddress(),
                title: faker.number.int({min: 1, max:2}),
                country: faker.helpers.arrayElement(countries),
                state: faker.location.state(),
                city: faker.location.city(),
                zipcode: faker.location.zipCode(),
                mobile_number: faker.phone.number(),      
            }   
            return userData;     
        });         
});
