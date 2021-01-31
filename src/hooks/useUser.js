import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUsers from "./useUsers";

const API_URL = window.Cypress ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

export default function useUser(id = null) {
  const [username, setUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [unrelatedUsers, setUnrelatedUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState("");

  const [appUsers, isApiAllUsersFetching, apiAllUsersError] = useUsers([!id]);

  //EDIT MODE
  const getUserDataById = useCallback(() => {
    setIsFetching(true);
    setApiError("");

    Promise.all([
      axios.get(`${API_URL}/users/${id}`),
      axios.get(`${API_URL}/user/${id}/friends`),
      axios.get(`${API_URL}/user/${id}/not-friends`),
    ])
      .then(([{ data: user }, { data: userFriends }, { data: userNotFriends }]) => {
        setUsername(user.name);
        setFriends(userFriends);
        setUnrelatedUsers(userNotFriends);
        setIsFetching(false);
        setApiError("");
      })
      .catch((e) => {
        setIsFetching(false);
        setApiError(e.message || "whoooops");
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      getUserDataById();
    }
  }, [id]);

  //CREATE MODE
  useEffect(() => {
    if (!id) {
      //useUsers will bring all users as not friends
      setIsFetching(isApiAllUsersFetching);
      setFriends([]);
      setUnrelatedUsers(appUsers);
      setApiError(apiAllUsersError);
    }
  }, [id, isApiAllUsersFetching, appUsers]);

  return [username, friends, unrelatedUsers, isFetching, apiError];
}
