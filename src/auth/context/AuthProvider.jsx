import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { types } from "../types/types";

const initialState = {
  logged: false,
  user: null,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const handleLogin = (name = "") => {
    const user = {
      id: 1,
      name: name,
    };

    const action = {
      type: types.login,
      payload: user,
    };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(action);
  };

  const handleLogout = () => {
    const action = {
      type: types.logout,
    };

    localStorage.removeItem("user");

    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,

        //Methods
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
