import lang from "../../../src/lang";
import faker from 'faker';

describe('USERS LIST PAGE',function(){

    beforeEach(() => {
        cy.visit('/')
    })

    it('initial load', function(){

        it('is reachable', function(){

            cy.url().should('include', '/');

        })

        it('shows page title', function(){

            cy.findByText(lang.users.list).should('exist').and('be.visible');

        })

        it('shows add new user button', function(){

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible');

        })

        it('shows a non empty list of users', function(){

            const fakeUsersList = new Array(10).map((_, idx) => ({id: idx + 1,  name: faker.fake("{{name.lastName}}} {{name.firstName}}") }));

            cy.intercept('GET', 'users', {
                statusCode: 200,
                body: fakeUsersList
            }).as('allUsers');

            fakeUsersList.forEach(user => {
                cy.findByText(user.name).should('exist').and('be.visible');
            })

        })

        it('shows a message on empty users response', function(){

            cy.intercept('GET', 'users', {
                statusCode: 200,
                body: []
            }).as('emptyUsers');

            cy.findByText(lang.users.emptyList).should('exist').and('be.visible');

        })

        it('handles user api failure gracefully', function(){

            cy.intercept('GET', 'users', {
                statusCode: 500,
            }).as('failedUsers');

            cy.findByText(lang.users.errors.list.apiOrNetworkFailure).should('exist').and('be.visible');

        })

    })

    describe('navigation', function(){

        it('reaches creation page on "new" button click', function(){

            cy.findByText(lang.users.actions.add).click();

            cy.url().should('include', '/create');

        })

        it('reaches a certain user show/edit page on list link click', function(){

            const fakeUsersList = new Array(1).map((_, idx) => ({id: idx + 1,  name: faker.fake("{{name.lastName}}} {{name.firstName}}") }));

            cy.intercept('GET', 'users', {
                statusCode: 200,
                body: fakeUsersList
            }).as('allUsers');

            cy.findByText((fakeUsersList[0].name)).click();

            cy.url().should('include', `/user/${fakeUsersList[0].id}`);

        })

    })

})