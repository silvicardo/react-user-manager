import useUserEditor from "./useUserEditor";
import useUserSubmit from "./useUserSubmit";

export default function useEditCreateUser(userId = null){

    const {state: {stored, next}, friends, notFriends, onNextUsernameChange, onSetUserToBeFriend, onSetUserToBeUnrelated} = useUserEditor(userId);
    const [onSubmit, isSubmitting, submitError] = useUserSubmit(userId);

    const submit = async () => {

        function preventExistingFriendIdsResubmit(){
            return next.friendsIds.filter(nextFriendId => !stored.friends.some(storedFriend => storedFriend.id === nextFriendId))
        }

        const submitData = {
            name: next.username,
            newFriendsIds : preventExistingFriendIdsResubmit(),
            deletingFriendshipsIds : next.removingFriendshipsIds
        }

        try {
            return await onSubmit(submitData);
        } catch (e) {
            throw e;
        }
    }

    return [ friends, notFriends, stored.username, next.username, onNextUsernameChange, onSetUserToBeFriend, onSetUserToBeUnrelated, submit, submitError];

}