import {useState, useEffect} from "react";
import axios from "axios";

const API_URL = window.Cypress ? 'http://localhost:3001' : process.env.REACT_APP_API_URL

export default function useUser(id = null) {
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState('');
    const [friends, setFriends] = useState([]);
    const [unrelatedUsers, setUnrelatedUsers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        setIsFetching(true);
        setApiError('');
        //fetch user
        Promise.all([
            axios.get(`${API_URL}/users/${id}`),
            axios.get(`${API_URL}/user/${id}/friends`),
            axios.get(`${API_URL}/user/${id}/not-friends`),
        ])
            .then(( [{data: user}, {data: userFriends}, {data: userNotFriends}]) => {
                console.log(user, userFriends, userNotFriends)
                setUserId(user.id)
                setUsername(user.name)
                setFriends(userFriends);
                setUnrelatedUsers(userNotFriends)
                setIsFetching(false);
                setApiError('')
            })
            .catch(e => {
                setIsFetching(false);
                setApiError(e.message || 'whoooops')
            })
    },[id])

    return [username, friends, unrelatedUsers, isFetching, apiError];
};


