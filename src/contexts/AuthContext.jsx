import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (getAccessToken()) {
      axios.get("/auth/me").then((res) => {
        setAuthUser(res.data.user);
      });
    }
  }, []);
  const login = async (credential) => {
    try {
      const res = await axios.post("/auth/login", credential);
      addAccessToken(res.data.accessToken);
      setAuthUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (input) => {
    const res = await axios.post("/auth/register", input);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, authUser, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
