const lang = {
    users : {
        new: 'new user',
        list: 'users',
        emptyList: 'no users found',
        name: 'name',
        friends: 'friends',
        noFriends: 'this user still has no friends',
        editName: 'edit username',
        actions : {
            edit: 'edit friends',
            remove: 'remove',
            add : 'new friend',
            select : 'select friend',
            create: 'save',
            pick: 'pick'
        },
        errors : {
            list: {
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