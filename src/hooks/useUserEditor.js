import {useEffect, useReducer, useRef} from "react";
import useUser from "./useUser";
import {createReducer} from "@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min";
import useUsersByRelationship from "./useUsersByRelationship";

export const getInitialUserEditorState = () => ({
    stored : {
        username: '',
        friends: [],
        unrelatedUsers: [],
    },
    next: {
        username: '',//API + UI -> stores nextUsername
        friendsIds: [],//API + UI -> stores all friendsIds that user adds(including user that were friend at load, gets removed and re-added in the same session)
        unrelatedUsersIds: [],//UI -> stores all unfriendedUserIds that user removes(only if they were already friends at load)
        removingFriendshipsIds: []//API -> stores storedFriendships ids to remove
    },

});

export const makeFriendEditCreateReducer = () => {
    
    const initialState = getInitialUserEditorState()

    //redux toolkit createReducer to take advantage of immer js immutability features
    return createReducer(initialState, {
        SET_STORED_USER_DATA: (state, action) => {

            for (let stateKey in action.payload){
                if(state.stored.hasOwnProperty(stateKey)){
                    state.stored[stateKey] = action.payload[stateKey]
                }
            }
            //reset next
            state.next.username = '';
            state.next.friendsIds = [];
            state.next.unrelatedUsersIds = [];
            state.next.removingFriendshipsIds = [];

        },
        SET_USER_TO_BE_FRIEND: (state, action) => {

            const nextFriendId = action.payload;
            const alreadyStoredFriend = state.stored.friends.find(friend => friend.id === nextFriendId);
            state.next.friendsIds.push(nextFriendId);
            state.next.unrelatedUsersIds = state.next.unrelatedUsersIds.filter(unrelatedId => unrelatedId !== nextFriendId);
            if(alreadyStoredFriend && alreadyStoredFriend.friendshipId){
                state.next.removingFriendshipsIds = state.next.removingFriendshipsIds.filter(friendshipId => friendshipId !== alreadyStoredFriend.friendshipId);
            }

        },
        SET_USER_TO_BE_UNRELATED: (state, action) => {

            const toDeleteFriendId  = action.payload;
            const storedRemovingFriend = state.stored.friends.find(friend => friend.id === toDeleteFriendId);


            state.next.friendsIds = state.next.friendsIds.filter(friendId => friendId !== toDeleteFriendId);
            if(storedRemovingFriend && storedRemovingFriend.friendshipId)
            state.next.removingFriendshipsIds.push(storedRemovingFriend.friendshipId);
            state.next.unrelatedUsersIds.push(toDeleteFriendId);

        },
        SET_NEXT_USERNAME: (state, action) => {
            state.next.username = action.payload
        }
    })
};

export default function useUserEditor(id = null){

    //db data
    const [
        storedUsername,
        storedFriends,
        storedUnrelatedUsers,
        isFetchingUserData,
        userApiError
    ] = useUser(id);

    const prevIsFetchingUserData = useRef(isFetchingUserData);

    //editing state + dispatch

    const [state, dispatch] = useReducer(
        makeFriendEditCreateReducer(),
        getInitialUserEditorState(),
        getInitialUserEditorState
    );

    const [friends, notFriends] = useUsersByRelationship(
        state.stored.friends,
        state.stored.unrelatedUsers,
        state.next.friendsIds,
        state.next.unrelatedUsersIds
    );

    // *** effects *** //

    useEffect(() => {

        const setStoredUserData = () => {
            dispatch({
                type: "SET_STORED_USER_DATA",
                payload: {
                    username: storedUsername,
                    friends: storedFriends,
                    unrelatedUsers: storedUnrelatedUsers,
                }
            })
        };

        if(id){//EDIT MODE
            if(!isFetchingUserData && storedUsername !== '' && !userApiError){
                setStoredUserData();
            }
        } else {//CREATE MODE
            if(prevIsFetchingUserData.current === true && isFetchingUserData === false && !userApiError){
                setStoredUserData();
            }
        }
        prevIsFetchingUserData.current = isFetchingUserData;

    },[id, storedUsername, storedFriends, storedUnrelatedUsers, isFetchingUserData])

    // **** friend handling methods **** //

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

    const onNextUsernameChange = (value) => dispatch({
        type: "SET_NEXT_USERNAME",
        payload: value
    })

    return {
        isFetchingUserData,
        state,
        friends,
        notFriends,
        onSetUserToBeFriend,
        onSetUserToBeUnrelated,
        onNextUsernameChange
    }
}