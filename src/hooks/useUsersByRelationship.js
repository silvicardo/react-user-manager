import { useMemo } from "react";

export default function useUsersByRelationship(storedFriends, storedNotFriends, nextFriendsIds, nextNotFriendsIds) {
  const friends = useMemo(() => {
    return [
      ...storedFriends.filter((friend) => !nextNotFriendsIds.includes(friend.id)),
      ...storedNotFriends.filter((notFriend) => nextFriendsIds.includes(notFriend.id)),
    ];
  }, [storedFriends, storedNotFriends, nextFriendsIds, nextNotFriendsIds]);

  const notFriends = useMemo(() => {
    return [
      ...storedNotFriends.filter((notFriend) => !nextFriendsIds.includes(notFriend.id)),
      ...storedFriends.filter((friend) => nextNotFriendsIds.includes(friend.id)),
    ];
  }, [storedFriends, storedNotFriends, nextFriendsIds, nextNotFriendsIds]);

  return [friends, notFriends];
}
