import { DependencyList, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AppUser } from "../types/appTypes";

const API_URL = "Cypress" in window ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

export default function useUsers(deps: DependencyList = []): [AppUser[], boolean, string] {
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [apiError, setApiError] = useState("");

  const fetchUsers = useCallback(async () => {
    if (isFetching) return;

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
  }, [isFetching]);

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, deps);

  return [appUsers, isFetching, apiError];
}
