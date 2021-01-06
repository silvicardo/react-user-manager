import lang from "../../../src/lang";

import faker from "faker";

describe('USER SHOW EDIT PAGE', function(){

    describe('initial load', function(){

        it('is reachable', function(){

            //assuming at least one user exists in the database the page must be reachable at url /user/1

            cy.visit('/user/1')

            cy.url().should('include', `/user/1`);

        })

        it('shows empty name input field focused and with correct placeholder', function(){

            const userId = 1;

            const fakeUser = {
                id: userId,
                name: faker.fake("{{name.lastName}}} {{name.firstName}}"),
                createdAt: faker.date.recent(),
                upatedAt: faker.date.recent()
            }

            cy.intercept('GET', `user/${userId}`, {
                statusCode: 200,
                body: fakeUser
            }).as('userShow');

            cy.intercept('GET', `user/${userId}/friends`, {
                statusCode: 200,
                body: []
            }).as('userFriends');

            cy.visit( `user/${userId}`);

            cy.findByPlaceholderText(fakeUser.name).should('have.value', '');

            cy.focused().should('have.attr', 'name', 'username');

        })

        it('shows user name in title', function(){

            const userId = 1;

            const fakeUser = {
                id: userId,
                name: faker.fake("{{name.lastName}}} {{name.firstName}}"),
                createdAt: faker.date.recent(),
                upatedAt: faker.date.recent()
            }

            cy.intercept('GET', `user/${userId}`, {
                statusCode: 200,
                body: fakeUser
            }).as('userShow');

            cy.intercept('GET', `user/${userId}/friends`, {
                statusCode: 200,
                body: []
            }).as('userFriends');

            cy.visit( `user/${userId}`);

            //user name will only be found in page title, input will be empty
            cy.findByText(fakeUser.name).should('exist').and('be.visible');

        })

        it('shows empty friends message when no friends for current user', function(){

            const userId = 1;

            const fakeUser = {
                id: userId,
                name: faker.fake("{{name.lastName}}} {{name.firstName}}"),
                createdAt: faker.date.recent(),
                upatedAt: faker.date.recent()
            }

            cy.intercept('GET', `user/${userId}`, {
                statusCode: 200,
                body: fakeUser
            }).as('userShow');

            cy.intercept('GET', `user/${userId}/friends`, {
                statusCode: 200,
                body: []
            }).as('userFriends');

            cy.visit( `user/${userId}`);

            cy.findByText(fakeUser.name).should('exist').and('be.visible');

        })

        it('shows list of friends for current user when user has friends', function(){

            const userId = 1;

            const fakeUser = {
                id: userId,
                name: faker.fake("{{name.lastName}}} {{name.firstName}}"),
                createdAt: faker.date.recent(),
                upatedAt: faker.date.recent()
            }

            cy.intercept('GET', `user/${userId}`, {
                statusCode: 200,
                body: fakeUser
            }).as('userShow');

            const fakeFriendsList = new Array(3).map((_, idx) => ({
                id: idx + 1,
                name: faker.unique(faker.fake("{{name.lastName}}} {{name.firstName}}")),
                createdAt: faker.date.recent(),
                upatedAt: faker.date.recent()
            }));

            cy.intercept('GET', `user/${userId}/friends`, {
                statusCode: 200,
                body: fakeFriendsList
            }).as('userFriends');

            cy.visit( `user/${userId}`);

            fakeFriendsList.forEach(friend => {
                cy.findByText(friend.name).should('exist').and('be.visible');
            })

        })

    })

    describe('friends handling', function(){

        it('can select new friend for current user from existing users', function(){

        })

        it('can remove existing friend for current user', function(){

        })

        //TODO???
        //schema is showing interface but not supposing the ability to reach create user page(create page not connected)

        it('reaches user creation page on create new friend for current user button click', function(){

        })

    })

    describe('submit validation', function(){

        it('cannot submit a new name already existing in users list', function(){

        })

    })

})