import lang from "../../../src/lang";

describe('USER CREATE PAGE', function () {

    beforeEach(function () {

        //list api fixture + new user notFriends
        cy.fixture('users/list/success.json').then(data => {
            this.usersList = data;
        })

    });

    describe('initial load', function () {

        it('is reachable', function () {

            const visitingUrl = `/user/create`;

            cy.visit(visitingUrl)

            cy.url().should('include', visitingUrl);
        })

        it('shows empty name input field focused and with correct placeholder', function () {

            const visitingUrl = `/user/create`;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.focused().should('have.attr', 'name', 'username').and('have.value', '');

        })

        it('initially shows an empty list of friends with select and create buttons', function () {

            const visitingUrl = `/user/create`;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.get('ul[data-cy=friends-list]').children().should('have.length', 0);

            cy.findByText(lang.users.actions.select).should('exist').and('be.visible');

            cy.findByText(lang.users.actions.edit).should('exist').and('be.visible');

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible');

        })

    })

    describe('username editing', function () {

        it('shows correctly typed changes', function () {

            const visitingUrl = `/user/create`;
            const newUsername = 'Ciccio Caputo';

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.focused().type(newUsername).should('have.value', newUsername);
        })
    });

    describe('new user friends handling', function () {

        it('can select new friend from not-friends and remove it back', function () {

            const visitingUrl = `/user/create`;
            const notFriendName = this.usersList[0].name;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            //not visible, initially showing friendsList
            cy.findByText(notFriendName).should('exist').and('be.hidden');

            //go to notFriends list
            cy.findByText(lang.users.actions.select).should('exist').and('be.visible').click();

            //and add it
            cy.findByText(notFriendName).should('exist').and('be.visible')
                .within((subject) => {
                    cy.findByText(lang.users.actions.pick).should('exist').and('be.visible').click();
                })

            //is now in friends list
            cy.findByText(notFriendName).should('exist').and('be.hidden');

            //get to friends list and check it is visible there

            cy.findByText(lang.users.actions.edit).should('exist').and('be.visible').click();

            cy.findByText(notFriendName).should('exist').and('be.visible')

            //remove it back
            cy.findByText(notFriendName).should('exist').and('be.visible')
                .within((subject) => {
                    cy.findByText(lang.users.actions.remove).should('exist').and('be.visible').click();
                })

            //not visible in friendsList
            cy.findByText(notFriendName).should('exist').and('be.hidden');

            //go to notFriends list
            cy.findByText(lang.users.actions.select).should('exist').and('be.visible').click();

            //and check it is there
            cy.findByText(notFriendName).should('exist').and('be.visible')

        })

    })

    describe('stacking views', function () {

        it('stacks a new create user view when clicking on create new friend button', function () {

            const visitingUrl = `/user/create`;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible').click();

            cy.get('[data-cy=stack-view]').should('have.length', 2);

        })

        it('asks the user to save or abort the current user creation on clicking on a lower item in the stack when two or more creation are stacked', function () {

            const visitingUrl = `/user/create`;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible').click();

            cy.get('[data-cy=stack-view]').last()
                .within((subject) => {
                    cy.get('[data-cy=stack-view-dismiss-area]').click();
                    cy.findByText(lang.users.stackViews.areYouSureToDismiss).should('exist').and('be.visible')
                    cy.findByText(lang.users.stackViews.stay).should('exist').and('be.visible')
                    cy.findByText(lang.users.stackViews.dismiss).should('exist').and('be.visible')
                });
        })

        it('is able to dismiss stacked view clicking on confirm dismiss', function () {

            const visitingUrl = `/user/create`;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible').click();

            cy.get('[data-cy=stack-view]').last()
                .within((subject) => {
                    cy.get('[data-cy=stack-view-dismiss-area]').click();

                    cy.findByText(lang.users.stackViews.dismiss).should('exist').and('be.visible').click()
                });

            cy.get('[data-cy=stack-view]').should('have.length', 1);
        })

        it('is able to keep stacked view clicking on cancel dismiss', function () {

            const visitingUrl = `/user/create`;

            cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUserNotFriends');

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible').click();

            cy.get('[data-cy=stack-view]').last()
                .within((subject) => {
                    cy.get('[data-cy=stack-view-dismiss-area]').click();

                    cy.findByText(lang.users.stackViews.stay).should('exist').and('be.visible').click();

                });

            cy.get('[data-cy=stack-view]').should('have.length', 2);
        })

    })


    describe('submit', function () {

        describe('validation', function () {

            it('cannot submit a name already existing in users list', function () {

                const visitingUrl = `/user/create`;
                const duplicateUsername = this.usersList[3].name;

                cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');
                cy.intercept('POST', `**/user/create`, {
                    statusCode: 403,
                    body: {
                        error: lang.server.editCreate.errors.noDuplicates
                    }
                })

                cy.visit(visitingUrl);

                cy.wait('@getUserNotFriends');

                cy.focused().type(duplicateUsername).should('have.value', duplicateUsername);

                cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();
                cy.findByText(lang.server.editCreate.errors.noDuplicates).should('exist').and('be.visible');

            })

        })

        describe('valid data submit handling', function () {

            describe('when view is the only one in the stack', function () {

                it('submits user and brings back to list page showing created user as last list element', function () {

                    const visitingUrl = `/user/create`;
                    const newUsername = 'Ciccio Caputo';
                    const newUser = {
                        id: 7,
                        name: newUsername,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }
                    cy.intercept('POST', `**/user/create`, {
                        statusCode: 200,
                        body: newUser
                    }).as('postNewUser');

                    cy.visit(visitingUrl);

                    cy.focused().type(newUsername).should('have.value', newUsername);

                    cy.intercept('GET', '**/users', {
                        statusCode: 200,
                        body: [...this.usersList, newUser]
                    }).as('updatedUsersList');

                    cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();

                    cy.url().should('equal', `${Cypress.config().baseUrl}/`);

                    cy.findByText(newUsername).should('exist').and('be.visible')
                })

                //USING DEPRECATED cy.server + route because same test with cy.intercept was failing
                it('attemps to submit, api fails once and succeeds on second attempt and brings back to list page showing created user as last list element', function () {

                    const visitingUrl = `/user/create`;
                    const newUsername = 'Ciccio Caputo';
                    const newUser = {
                        id: 7,
                        name: newUsername,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }

                    cy.server();
                    cy.route('GET', '**/users', this.usersList).as('getUserNotFriends');

                    cy.route({
                        method: 'POST',
                        status: 500,
                        url: `**/user/create`,
                    }).as('submitUsersFailure')

                    cy.visit(visitingUrl);
                    cy.wait('@getUserNotFriends');

                    cy.focused().type(newUsername).should('have.value', newUsername);


                    cy.route('GET', '**/users', [...this.usersList, newUser]).as('updatedUsersList');

                    cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();
                    cy.wait('@submitUsersFailure');

                    cy.route('POST', `/user/create`, newUser).as('submitUsersSuccess');

                    cy.wait('@submitUsersSuccess');

                    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
                    cy.findByText(newUsername).should('exist').and('be.visible')
                    cy.shouldBeCalled('@submitUsersFailure', 1);
                    cy.shouldBeCalled('@submitUsersSuccess', 1);

                })

                //USING DEPRECATED cy.server + route because same test with cy.intercept was failing
                it('attemps to submit, api fails twice, notifies user inviting to retry', function () {

                    const visitingUrl = `/user/create`;
                    const newUsername = 'Ciccio Caputo';
                    const newUser = {
                        id: 7,
                        name: newUsername,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }

                    cy.server();
                    cy.route('GET', '**/users', this.usersList).as('getUserNotFriends');

                    cy.route({
                        method: 'POST',
                        status: 500,
                        url: `**/user/create`,
                    }).as('submitUsersFailure')

                    cy.visit(visitingUrl);
                    cy.wait('@getUserNotFriends');

                    cy.focused().type(newUsername).should('have.value', newUsername);

                    cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();


                    cy.findByText(lang.server.editCreate.errors.notUsersFault).should('exist').and('be.visible')

                    cy.shouldBeCalled('@submitUsersFailure', 2);

                    cy.url().should('equal', `${Cypress.config().baseUrl}${visitingUrl}`);

                })

            })

            describe('when view is not the only one in the stack', function () {

                //ONLY NOT REDUNDANT TESTS

                it('on submit success closes current stack and shows previous in the stack', function () {

                    const visitingUrl = `/user/create`;
                    const newUsername = 'Ciccio Caputo';
                    const newUser = {
                        id: 7,
                        name: newUsername,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }
                    cy.intercept('POST', `**/user/create`, {
                        statusCode: 200,
                        body: newUser
                    }).as('postNewUser');


                    cy.intercept(`**/users`, this.usersList).as('getUserNotFriends');

                    cy.visit(visitingUrl);

                    cy.wait('@getUserNotFriends');

                    cy.findByText(lang.users.actions.add).should('exist').and('be.visible').click();

                    cy.get('[data-cy=stack-view]').should('have.length', 2);

                    cy.get('[data-cy=stack-view]').last()
                        .within((subject) => {

                            cy.focused().type(newUsername).should('have.value', newUsername);

                            cy.intercept('GET', '**/users', {
                                statusCode: 200,
                                body: [...this.usersList, newUser]
                            }).as('updatedUsersList');

                            cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();

                        });

                    cy.get('[data-cy=stack-view]').should('have.length', 1);

                })

            })

        })

    })

})