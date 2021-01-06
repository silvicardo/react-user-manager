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

            const fakeUsersList = new Array(10).map((_, idx) => ({id: idx,  name: faker.fake("{{name.lastName}}} {{name.firstName}}") }));

            cy.intercept('**/users', fakeUsersList).as('allUse');

            fakeUsersList.forEach(user => {
                cy.findByText(user.name).should('exist').and('be.visible');
            })

        })

        it('shows a message on empty users response', function(){

            cy.intercept('**/users', []).as('emptyUsers');

            //TODO:: create copy in branch lang-text
            cy.findByText('no users found').should('exist').and('be.visible');

        })

        it('handles user api failure gracefully', function(){

        })

    })

    describe('navigation', function(){

        it('reaches creation page on "new" button click', function(){

        })

        it('reaches a certain user show/edit page on list link click', function(){

        })

    })

})