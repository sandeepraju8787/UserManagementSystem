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
  currentPage: 1, // Added currentPage to track the current page
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload.users,
        loading: false,
        error: null,
        currentPage: action.payload.page,
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
      // Filter out the deleted user
      const updatedUsers = state.users.filter(
        (user) => user._id !== action.payload
      );
      return {
        ...state,
        users: updatedUsers,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_USER_SUCCESS":
      // Update the user in the list
      const modifiedUsers = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return {
        ...state,
        users: modifiedUsers,
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
  const apiUrl = "http://localhost:4000/api/users";
  const limit = 10;

  useEffect(() => {
    console.log("enterd useeffect");
    const fetchUsersByPage = async () => {
      console.log(`calling data for page ${state.currentPage}`);
      try {
        const { users, page } = await fetchUsers(
          `${apiUrl}?page=${state.currentPage}&limit=${limit}`
        );
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: { users, page } });
      } catch (error) {
        dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
      }
    };

    fetchUsersByPage();
  }, [state.currentPage]);

  const addUser = async (user) => {
    try {
      const newUser = await addUserService(apiUrl, user);
      dispatch({ type: "ADD_USER_SUCCESS", payload: newUser });
    } catch (error) {
      dispatch({ type: "ADD_USER_FAILURE", payload: error.message });
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
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserService(apiUrl, userId);
      dispatch({ type: "DELETE_USER_SUCCESS", payload: userId });
    } catch (error) {
      dispatch({ type: "DELETE_USER_FAILURE", payload: error.message });
    }
  };

  const setSelectedUser = (user) => {
    dispatch({ type: "SET_SELECTED_USER", payload: user });
  };

  const setCurrentPage = (page) =>
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        selectedUser: state.selectedUser,
        currentPage: state.currentPage,
        fetchUsers,
        setCurrentPage, // Setter function for currentPage
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
