import lang from "../../../src/lang";

describe('USERS LIST PAGE',function(){

    beforeEach(function () {

        //list api fixture
        cy.fixture('users/list/success.json').then(data => {
            this.usersList = data;
        })

        // Edit page fixtures
        cy.fixture('users/1/user.json').then(data => {
            this.userJson = data;
        })

        cy.fixture('users/1/friends.json').then(data => {
            this.userFriendsJson = data;
        })

        cy.fixture('users/1/notFriends.json').then(data => {
            this.userNotFriendsJson = data;
        })

    });

    describe('initial load', function(){

        it('is reachable', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: []
            }).as('emptyUsers');

            cy.visit('/');

            cy.url().should('include', '/');

        })

        it('shows page title', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: []
            }).as('emptyUsers');

            cy.visit('/');

            cy.findByText(lang.users.list).should('exist').and('be.visible');

        })

        it('shows add new user button', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: []
            }).as('emptyUsers');

            cy.visit('/');

            cy.findByText(lang.users.new).should('exist').and('be.visible');

        })

        it('shows a non empty list of users', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: this.usersList
            }).as('allUsers');

            cy.visit('/');

            this.usersList.forEach(user => {
                cy.findByText(user.name).should('exist').and('be.visible');
            })

        })

        it('shows a message on empty users response', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: []
            }).as('emptyUsers');

            cy.visit('/');

            cy.findByText(lang.users.emptyList).should('exist').and('be.visible');

        })

        it('handles user api failure gracefully', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 500,
            }).as('failedUsers');

            cy.visit('/');

            cy.findByText(lang.users.errors.list.apiOrNetworkFailure).should('exist').and('be.visible');

        })

    })

    describe('navigation', function(){

        //TODO:: REACTIVATE WHEN CREATE PAGE OK
        it.skip('reaches creation page on "new" button click', function(){

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: []
            }).as('emptyUsers');

            cy.visit('/');

            cy.findByText(lang.users.new).click();

            cy.url().should('include', '/create');

        })

        it('reaches a certain user show/edit page on list link click', function(){

            //edit page intercepts
            cy.intercept(`**/users/${this.userJson.id}`, this.userJson)
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson)
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson)

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: this.usersList
            }).as('allUsers');

            cy.visit('/');

            cy.findByText(this.usersList[0].name).click();

            cy.url().should('include', `/user/${this.usersList[0].id}`);

        })

    })

})