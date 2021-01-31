import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = window.Cypress ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

export default function useUsers(deps = []) {
  const [appUsers, setAppUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchUsers = async () => {
    if (isFetching === true) return;

    setIsFetching(true);
    setApiError("");

    try {
      const { data } = await axios.get(`${API_URL}/users`);
      setAppUsers(data);
      setIsFetching(false);
    } catch (e) {
      setApiError(e.message);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, deps);

  return [appUsers, isFetching, apiError];
}
