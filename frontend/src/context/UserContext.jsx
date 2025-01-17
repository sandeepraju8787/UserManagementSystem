import { createContext, useReducer, useContext, useEffect } from "react";
import {
  fetchUsers,
  addUser as addUserService,
  editUser as editUserService,
  deleteUser as deleteUserService,
} from "../utils/api.js";

export const UserContext = createContext();

const initialState = {
  users: [],
  selectedUser: null,
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
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_USER_SUCCESS":
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return {
        ...state,
        users: updatedUsers,
      };
    case "UPDATE_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload,
      };
    default:
      return state;
  }
};

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const apiUrl =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:4000/api/users";

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { users } = await fetchUsers(apiUrl);
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
      throw error;
    }
  };

  const editUser = async (userId, updatedUserData) => {
    try {
      const updatedUser = await editUserService(
        apiUrl,
        userId,
        updatedUserData
      );
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: updatedUser });
    } catch (error) {
      dispatch({ type: "UPDATE_USER_FAILURE", payload: error.message });
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserService(apiUrl, userId);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } catch (error) {
      dispatch({ type: "DELETE_USER_FAILURE", payload: error.message });
      throw error;
    }
  };

  const setSelectedUser = (user) => {
    dispatch({ type: "SET_SELECTED_USER", payload: user });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        selectedUser: state.selectedUser,
        editUser,
        addUser,
        handleDeleteUser,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
