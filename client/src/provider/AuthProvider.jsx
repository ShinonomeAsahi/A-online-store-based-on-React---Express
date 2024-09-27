import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user_id, setUserId] = useState(localStorage.getItem('user_id'));
  const [user_name, setUserName] = useState(localStorage.getItem('user_name'));

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const saveUserId = (userId) => {
    localStorage.setItem('user_id', userId);
    setUserId(userId);
  };

  const saveUserName = (userName) => {
    localStorage.setItem('user_name', userName);
    setUserName(userName);
  };

  const value = {
    token,
    setToken: saveToken,
    user_id,
    setUserId: saveUserId,
    user_name,
    setUserName: saveUserName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};