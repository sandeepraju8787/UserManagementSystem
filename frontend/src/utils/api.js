// utils/api.js

// Function to fetch all users
export const fetchUsers = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to add a new user
export const addUser = async (apiUrl, user) => {
  try {
    console.log(`${apiUrl}/add`);
    const response = await fetch(`${apiUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const editUser = async (userId, updatedUserData) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });
    if (!response.ok) {
      throw new Error("Failed to edit user");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error editing user: ${error.message}`);
  }
};

// Function to delete a user by ID
export const deleteUser = async (apiUrl, userId) => {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log(userId + "is this" + `${apiUrl}/${userId}`);
      throw new Error("Failed to delete user");
    }
    return userId;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
