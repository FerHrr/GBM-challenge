import React, { createContext } from "react";
import { User } from "../interfaces";

interface ProviderContext {
  children: any;
  user: User;
  update: (val: User) => void;
}

const initialState = {
  user: {
    logged: false,
    displayName: "",
    email: "",
    uid: "",
    isBlocked: false,
    rol: null,
    notificationsRead: false,
  } as User,
  update: (val: User) => {},
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children, user, update }: ProviderContext) => {
  return (
    <UserContext.Provider value={{ user, update }}>
      {children}
    </UserContext.Provider>
  );
};
