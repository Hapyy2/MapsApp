"use client";
// services/authService.js

class AuthService {
  constructor() {
    // Initialize registeredUsers from localStorage or use default if empty
    const storedUsers =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("registeredUsers"))
        : null;

    this.registeredUsers = storedUsers || [
      {
        id: "1",
        username: "user1",
        email: "user1@example.com",
        password: "password123",
        firstName: "User",
        lastName: "One",
      },
    ];

    // Save initial users if localStorage is empty
    if (typeof window !== "undefined" && !storedUsers) {
      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(this.registeredUsers)
      );
    }

    // Initialize currentUser from localStorage
    this.currentUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null;
  }

  // Modified to always read from localStorage
  getAllUsers() {
    if (typeof window === "undefined") return [];
    const storedUsers = localStorage.getItem("registeredUsers");
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  async login({ email, password }) {
    // Get latest users from localStorage
    const users = this.getAllUsers();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = users.find((u) => u.email === email);

    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = `mock-jwt-token-${Math.random()}`;

    this.currentUser = {
      user: userWithoutPassword,
      token,
    };

    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    return this.currentUser;
  }

  async updateProfile(userData) {
    if (!this.currentUser) {
      throw new Error("Not authenticated");
    }

    // Get latest users from localStorage
    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === this.currentUser.user.id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    if (
      userData.email !== users[userIndex].email &&
      users.some((u) => u.email === userData.email)
    ) {
      throw new Error("Email already in use");
    }

    const updatedUser = {
      ...users[userIndex],
      ...userData,
      password: users[userIndex].password,
    };

    users[userIndex] = updatedUser;
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = updatedUser;
    this.currentUser = {
      ...this.currentUser,
      user: userWithoutPassword,
    };

    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    return userWithoutPassword;
  }

  async changePassword(currentPassword, newPassword) {
    if (!this.currentUser) {
      throw new Error("Not authenticated");
    }

    // Get latest users from localStorage
    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === this.currentUser.user.id);

    if (userIndex === -1 || users[userIndex].password !== currentPassword) {
      throw new Error("Invalid current password");
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    return true;
  }

  getCurrentUser() {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }

  addUser(userData) {
    // Get latest users from localStorage
    const users = this.getAllUsers();

    if (users.some((u) => u.email === userData.email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: String(users.length + 1),
      ...userData,
    };

    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    return newUser;
  }
}

// Create a singleton instance
const authService = new AuthService();
export default authService;
