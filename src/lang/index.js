const lang = {
    users : {
        new: 'new user',
        list: 'users',
        name: 'name',
        friends: 'friends',
        actions : {
            remove: 'remove',
            add : 'new',
            select : 'select friend',
            create: 'save',
        },
        errors : {
            list: {
                empty: 'no users found',
                apiOrNetworkFailure: 'could not load users, refresh to retry',
            },
            createEdit: {
                existingUserName: 'an user with this name is already registered',
                apiOrNetworkFailure: 'could not save user',
            }
        }
    }
}

export default lang;