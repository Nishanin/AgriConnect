import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getProfile,
  logout as apiLogout,
} from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && !user) {
      getProfile(token)
        .then((u) => {
          // API might return an error object; check for id or email to verify
          if (u && !u.message) {
            // Maintain compatibility: if server returned roles array but no
            // active `role`, prefer a previously selectedRole from
            // localStorage or default to first available role.
            try {
              const storedSelected = JSON.parse(
                localStorage.getItem("selectedRole")
              );
              if (storedSelected) u.role = storedSelected;
              else if (!u.role && u.roles && u.roles.length)
                u.role = u.roles[0];
            } catch (e) {
              if (!u.role && u.roles && u.roles.length) u.role = u.roles[0];
            }
            setUser(u);
          }
        })
        .catch(() => {
          logout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async ({ email, password, selectedRole }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiLogin({ email, password, selectedRole });
      if (res.token) {
        // API returns user.roles and a convenience `role` for active role
        const u = res.user;
        // persist selectedRole so future profile fetches can restore it
        if (selectedRole) {
          u.role = selectedRole;
          localStorage.setItem("selectedRole", JSON.stringify(selectedRole));
        } else if (!u.role && u.roles && u.roles.length) {
          u.role = u.roles[0];
        }
        setToken(res.token);
        setUser(u);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(u));
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async ({
    username,
    email,
    password,
    role,
    location,
    phone,
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRegister({
        username,
        email,
        password,
        role,
        location,
        phone,
      });
      if (res.token) {
        const u = res.user;
        // Use the provided role (if any) as active role, otherwise use
        // server-provided `role` or default to first roles entry.
        if (role) {
          u.role = role;
          localStorage.setItem("selectedRole", JSON.stringify(role));
        } else if (!u.role && u.roles && u.roles.length) u.role = u.roles[0];
        setToken(res.token);
        setUser(u);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(u));
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    apiLogout();
    localStorage.removeItem("selectedRole");
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
