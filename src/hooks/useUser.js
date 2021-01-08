import {useState, useEffect} from "react";

export default function useUser(id = null) {
    const [username, setUsername] = useState('');
    const [friendships, setFriendships] = useState([]);
    const [unrelatedUsers, setUnrelatedUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        //fetch user
    },[id])

    return [username, friendships, unrelatedUsers, isFetching, apiError];
};


