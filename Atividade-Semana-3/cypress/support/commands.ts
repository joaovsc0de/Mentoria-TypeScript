/// <reference types="cypress" />

import type { IUser} from "@/interfaces/iusers.js";

Cypress.Commands.add('registerAccount', (userData: IUser) => {
        cy.get(`input[id='id_gender${userData.title}']`).check();
        cy.get('input[data-qa="password"]').type(userData.password);
        cy.get('select[data-qa="days"]').select(userData.birth_day);
        cy.get('select[data-qa="months"]').select(userData.birth_month);
        cy.get('select[data-qa="years"]').select(userData.birth_year);
        cy.get('input[data-qa="first_name"]').type(userData.first_name);
        cy.get('input[data-qa="last_name"]').type(userData.last_name);
        cy.get('input[data-qa="company"]').type(userData.company);
        cy.get('input[data-qa="address"]').type(userData.address);
        cy.get('input[data-qa="address2"]').type(userData.address2);
        cy.get('select[data-qa="country"]').select(userData.country);
        cy.get('input[data-qa="state"]').type(userData.state);
        cy.get('input[data-qa="city"]').type(userData.city);
        cy.get('input[data-qa="zipcode"]').type(userData.zipcode);
        cy.get('input[data-qa="mobile_number"]').type(userData.mobile_number);
        cy.get('button[data-qa="create-account"]').click();
        cy.verifyVisibleText("Account Created!");
        cy.get('a[data-qa="continue-button"]').click();
});

Cypress.Commands.add('navigate', (page: string) => {
    cy.get(`a[href='${page}']`).first().click();
});

Cypress.Commands.add('fillSignupDetails', (first_name: string, email: string) => {
        cy.get('input[data-qa="signup-name"]').type(first_name);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.get('button[data-qa="signup-button"]').click();
});

Cypress.Commands.add('verifyLoggedUser', (first_name: string) => {
        cy.contains(`Logged in as ${first_name}`).should('be.visible');
});

Cypress.Commands.add('deleteAccount', () => {
        cy.get('a[href="/delete_account"]').click();
        cy.get('h2[data-qa="account-deleted"]').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();
});

Cypress.Commands.add('verifyVisibleText', (text: string) => {
        cy.contains(text).should('be.visible');
});

Cypress.Commands.add('login', (email: string, password:string) => {
        cy.get('input[data-qa="login-email"]').type(email);
        cy.get('input[data-qa="login-password"]').type(password);
        cy.get('button[data-qa="login-button"]').click();
})
