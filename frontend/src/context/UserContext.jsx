// context/UserContext.js

import { createContext, useReducer, useEffect } from "react";
import {
  fetchUsers,
  addUser as addUserService,
  deleteUser as deleteUserService,
} from "../utils/api.js";
// import dotenv from "dotenv";

// dotenv.config();

export const UserContext = createContext();

const initialState = {
  users: [],
  loading: true,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        users: [],
        loading: false,
        error: action.payload,
      };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const apiUrl = "http://localhost:4000/api/users"; // Default to localhost

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await fetchUsers(apiUrl);
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: users });
      } catch (error) {
        dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
      }
    };

    fetchAllUsers();
  }, [apiUrl]);

  const addUser = async (user) => {
    try {
      const newUser = await addUserService(apiUrl, user);
      dispatch({ type: "ADD_USER_SUCCESS", payload: newUser });
    } catch (error) {
      dispatch({ type: "ADD_USER_FAILURE", payload: error.message });
      throw error; // Propagate the error for handling in components
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserService(apiUrl, userId);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } catch (error) {
      dispatch({ type: "DELETE_USER_FAILURE", payload: error.message });
      throw error; // Propagate the error for handling in components
    }
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        addUserService,
        handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
