import React from "react";

const lang = {
    users : {
        new: 'new user',
        list: 'users',
        emptyList: 'no users found',
        name: 'name',
        friends: 'friends',
        noFriends: 'you have no friends!',
        typeNewName: 'type desired username',
        editName: 'edit username',
        stackViews: {
            areYouSureToDismiss: 'Are you sure you want to dismiss current operation?',
            dismiss: 'Dismiss',
            stay: 'Continue'
        },
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
        },
        fetching: {
            loadingUsers: 'give me a second...',
        }
    },
    routes: {
        notFound: "Where are you going?"
    }
}

export default lang;