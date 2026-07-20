import { makeAutoObservable, runInAction } from "mobx";
import { API_URL } from "../config/api";

class AuthStore {
  isAuthenticated = false;
  isAdmin = false;
  isReady = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async checkAuth() {
    try {
      const response = await fetch(`${API_URL}/me`, { credentials: "include" });
      if (response.ok) {
        const user = await response.json();
        runInAction(() => {
          this.isAuthenticated = true;
          this.isAdmin = user.role === "admin";
          this.user = user;
        });
      } else {
        runInAction(() => {
          this.isAuthenticated = false;
          this.isAdmin = false;
          this.user = null;
        });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      runInAction(() => {
        this.isReady = true;
      });
    }
  }

  async login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "invalid_credentials");
    }

    const user = await response.json();
    runInAction(() => {
      this.isAuthenticated = true;
      this.isAdmin = user.role === "admin";
      this.user = user;
    });
    return user;
  }

  async logout() {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    runInAction(() => {
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.user = null;
    });
  }
}

const authStore = new AuthStore();
export default authStore;
