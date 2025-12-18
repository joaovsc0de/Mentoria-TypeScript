// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import type { IUser } from '@/interfaces/iusers.js';
import './commands.js'
import '@shelex/cypress-allure-plugin';

declare global {
    namespace Cypress { 
        interface Chainable {
            deleteAccount(): Chainable;
            verifyLoggedUser(name: string): Chainable;
            createAccount(user: IUser): Chainable;
            signup(name: string, email: string): Chainable;
            navigate(page: string): Chainable;
            verifyText(classe: string, text: string): Chainable;
            login(email: string, password: string): Chainable;
            generateUser(): Chainable;
            takeEvidence(name: string): Chainable;
        }
    }
}    