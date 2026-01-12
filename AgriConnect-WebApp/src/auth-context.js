import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getProfile,
  logout as apiLogout,
} from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && !user) {
      getProfile(token)
        .then((u) => setUser(u))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    const res = await apiLogin({ email, password });
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
    } else {
      setError(res.message || "Login failed");
    }
    setLoading(false);
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    const res = await apiRegister({ username, email, password });
    if (res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
    } else {
      setError(res.message || "Registration failed");
    }
    setLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    apiLogout();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
