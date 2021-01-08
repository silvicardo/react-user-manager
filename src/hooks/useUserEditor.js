import {createReducer} from "@reduxjs/toolkit/src/createReducer";
import {useEffect, useReducer} from "react";
import useUser from "./useUser";

const makeFriendEditCreateReducer = () => createReducer(getInitialUserEditorState(), {
    SET_STORED_USER_DATA: (state, action) => {
        state.stored = {...action.payload}
    },
    SET_USER_TO_BE_FRIEND: (state, action) => {
        //TODO:...
    },
    SET_USER_TO_BE_UNRELATED: (state, action) => {
        //TODO:...
    },
})

const getInitialUserEditorState = () => ({
    stored : {
        username: '',
        friendships: [],
        unrelatedUsers: [],
    },
    next: {
        username: '',
        friendsIds: [],
        unrelatedUsersIds: [],
    },

})

export default function useUserEditor(id = null){

    //db data
    const [storedUsername, storedFriendships, storedUnrelatedUsers, isFetchingUser, userApiError] = useUser(id);

    //editing data

    const [state, dispatch] = useReducer(makeFriendEditCreateReducer(), getInitialUserEditorState(), getInitialUserEditorState);

    useEffect(() => {
        if(!isFetchingUser && storedUsername !== '' && !userApiError){
            dispatch({
                type: "SET_STORED_USER_DATA",
                payload: {
                    username: storedUsername,
                    friendships: [...storedFriendships],
                    unrelatedUsers: [...storedUnrelatedUsers],
                }
            })
        }

    },[storedUsername, storedFriendships, storedUnrelatedUsers, isFetchingUser])

    const onSetUserToBeFriend = (id) => {

    }

    const onSetUserToBeUnrelated = (id) => {

    }



}