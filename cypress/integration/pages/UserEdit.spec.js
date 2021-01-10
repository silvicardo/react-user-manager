import lang from "../../../src/lang";

describe('USER SHOW EDIT PAGE', function(){

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

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;

            //assuming at least one user exists in the database the page must be reachable at url /user/1

            cy.visit(visitingUrl)

            cy.url().should('include', visitingUrl);

        })

        it('shows empty name input field focused and with correct placeholder', function(){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser');
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);

            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.focused().should('have.attr', 'name', 'username').and('have.value','');

        })

        it('shows user name in title', function(){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);

            //user name will only be found in page title, input will be empty
            cy.findByText(this.userJson.name).should('exist').and('be.visible');

        })

        it('shows empty friends message when no friends for current user', function(){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, []).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, []).as('getUserNotFriends');

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.findByText(lang.users.noFriends).should('exist').and('be.visible');

        })

        it('shows list of friends for current user when user has friends', function(){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            this.userFriendsJson.forEach(friend => {
                cy.findByText(friend.name).should('exist').and('be.visible');
            })

        })

    })

    describe('username editing', function(){

        it('shows correctly typed changes', function (){
            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const newUsername = 'Ciccio Caputo';

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.focused().type(newUsername).should('have.value', newUsername);
        })
    });

    describe('friends handling', function(){

        it('can select new friend from not-friends and remove it back', function(){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const notFriendName = this.userNotFriendsJson[0].name;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
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

        it('can remove existing friend and then re-add it', function(){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const friendName = this.userFriendsJson[0].name;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            //remove friend
            cy.findByText(friendName).should('exist').and('be.visible')
                .within((subject) => {
                    cy.findByText(lang.users.actions.remove).should('exist').and('be.visible').click();
                })

            //is now in notFriends list
            cy.findByText(friendName).should('exist').and('be.hidden');

            //go to notFriends list
            cy.findByText(lang.users.actions.select).should('exist').and('be.visible').click();

            //and add it again
            cy.findByText(friendName).should('exist').and('be.visible')
                .within((subject) => {
                    cy.findByText(lang.users.actions.pick).should('exist').and('be.visible').click();
                })

            //is now back in friends list
            cy.findByText(friendName).should('exist').and('be.hidden');

            //get to friends list and check it is visible there

            cy.findByText(lang.users.actions.edit).should('exist').and('be.visible').click();

            cy.findByText(friendName).should('exist').and('be.visible')

        })

        it('reaches user creation page on create new friend click', function(){
            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const friendName = this.userFriendsJson[0].name;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.findByText(lang.users.actions.add).should('exist').and('be.visible').click();
            cy.url().should('include', 'user/create')
        })

    })

    describe('submit', function(){

        it('cannot submit a name already existing in users list', function(){
            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const duplicateUsername = this.usersList[3].name;

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');
            cy.intercept('PUT',`**/user/${userId}/edit`, {
                statusCode: 403,
                body: {
                    error: lang.server.editCreate.errors.noDuplicates
                }
            })

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.focused().type(duplicateUsername).should('have.value', duplicateUsername);

            cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();
            cy.findByText(lang.server.editCreate.errors.noDuplicates).should('exist').and('be.visible');

        })

        it('submits successfully and gets redirected to usersList page', function (){
            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const newUsername = "Non esisto";

            cy.intercept(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.intercept(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.intercept(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');
            cy.intercept('PUT',`**/user/${userId}/edit`, {
                statusCode: 200,
                body: {}
            })

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.focused().type(newUsername).should('have.value', newUsername);

            cy.intercept('GET', '**/users', {
                statusCode: 200,
                body: this.usersList.map(user => {
                    return user.id == userId ? {
                        ...user,
                        name: newUsername,
                        createdAt: Date.now()
                    } : user;
                } )
            }).as('allUsers');

            cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();

            cy.url().should('equal',  `${Cypress.config().baseUrl}/`);

            cy.findByText(newUsername).should('exist').and('be.visible')

        })

        //USING DEPRECATED cy.server + route because same test with cy.intercept was failing
        it('attemps to submit, api fails once and succeeds on second attempt', function (){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const newUsername = "Non esisto";

            cy.server();
            cy.route(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.route(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.route(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');
            cy.route({
                method: 'PUT',
                status: 500,
                url: `**/user/${userId}/edit`,
            }).as('submitUsersFailure')

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.focused().type(newUsername).should('have.value', newUsername);

            cy.route('GET', '**/users',this.usersList.map(user => {
                return user.id == userId ? {
                    ...user,
                    name: newUsername,
                    createdAt: Date.now()
                } : user;
            } )).as('allUsers');


            cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();
            cy.wait('@submitUsersFailure');

            cy.route('PUT',`/user/${userId}/edit`,{}).as('submitUsersSuccess');

            cy.wait('@submitUsersSuccess');

            cy.url().should('equal',  `${Cypress.config().baseUrl}/`);
            cy.findByText(newUsername).should('exist').and('be.visible')
            cy.shouldBeCalled('@submitUsersFailure', 1);
            cy.shouldBeCalled('@submitUsersSuccess', 1);

        })

        it('attemps to submit, api fails twice, notifies user inviting to retry', function (){

            const userId = 1;
            const visitingUrl = `/user/${userId}/edit`;
            const newUsername = "Non esisto";

            cy.server();
            cy.route(`**/users/${this.userJson.id}`, this.userJson).as('getUser')
            cy.route(`**/user/${this.userJson.id}/friends`, this.userFriendsJson).as('getUserFriends');
            cy.route(`**/user/${this.userJson.id}/not-friends`, this.userNotFriendsJson).as('getUserNotFriends');
            cy.route({
                method: 'PUT',
                status: 500,
                url: `**/user/${userId}/edit`,
            }).as('submitUsersFailure')

            cy.visit(visitingUrl);
            cy.wait('@getUser');
            cy.wait('@getUserFriends');
            cy.wait('@getUserNotFriends');

            cy.focused().type(newUsername).should('have.value', newUsername);

            cy.route('GET', '**/users',this.usersList.map(user => {
                return user.id == userId ? {
                    ...user,
                    name: newUsername,
                    createdAt: Date.now()
                } : user;
            } )).as('allUsers');


            cy.findByText(lang.users.actions.submit).should('exist').and('be.visible').click();

            cy.url().should('equal',  `${Cypress.config().baseUrl}${visitingUrl}`);

            cy.findByText(lang.server.editCreate.errors.notUsersFault).should('exist').and('be.visible')

            cy.shouldBeCalled('@submitUsersFailure', 2);

        })

    })

})