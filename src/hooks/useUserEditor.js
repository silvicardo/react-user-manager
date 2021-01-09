import {useEffect, useReducer} from "react";
import useUser from "./useUser";
import {createReducer} from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min";


export const makeFriendEditCreateReducer = () => {
    const initialState = getInitialUserEditorState()
    return createReducer(initialState, {
        SET_STORED_USER_DATA: (state, action) => {
            for (let stateKey in action.payload){
                if(state.stored.hasOwnProperty(stateKey)){
                    state.stored[stateKey] = action.payload[stateKey]
                }
            }
        },
        SET_USER_TO_BE_FRIEND: (state, action) => {
            if(!state.next.friendsIds.includes(action.payload)){
                state.next.friendsIds.push(action.payload)
            }
        },
        SET_USER_TO_BE_UNRELATED: (state, action) => {
            try {
                const toDeleteFriendId  = action.payload;
                const removingFriendshipId = state.stored.friends.find(friend => friend.id == toDeleteFriendId).friendshipId;
                if(!state.next.removingFriendshipsIds.includes(removingFriendshipId)) {
                    state.next.removingFriendshipsIds.push(removingFriendshipId)
                    state.next.unrelatedUsersIds.push(toDeleteFriendId);
                }
            } catch(e){

            }
        }
    })
}

export const getInitialUserEditorState = () => ({
    stored : {
        username: '',
        friends: [],
        unrelatedUsers: [],
    },
    next: {
        username: '',//API + UI
        friendsIds: [],//API + UI
        unrelatedUsersIds: [],//UI
        removingFriendshipsIds: []//API
    },

})

export default function useUserEditor(id = null){

    //db data
    const [storedUsername, storedFriends, storedUnrelatedUsers, isFetchingUser, userApiError] = useUser(id);

    //editing data

    const [state, dispatch] = useReducer(makeFriendEditCreateReducer(), getInitialUserEditorState(), getInitialUserEditorState);

    useEffect(() => {
        if(!isFetchingUser && storedUsername !== '' && !userApiError){
            dispatch({
                type: "SET_STORED_USER_DATA",
                payload: {
                    username: storedUsername,
                    friends: storedFriends,
                    unrelatedUsers: storedUnrelatedUsers,
                }
            })
        }

    },[storedUsername, storedFriends, storedUnrelatedUsers, isFetchingUser])

    const onSetUserToBeFriend = (userId) => {
        dispatch({
            type: "SET_USER_TO_BE_FRIEND",
            payload: userId
        })
    }

    const onSetUserToBeUnrelated = (friendId) => {
        dispatch({
            type: "SET_USER_TO_BE_UNRELATED",
            payload: friendId
        })
    }

    return {
        state,
        onSetUserToBeFriend,
        onSetUserToBeUnrelated
    }
}