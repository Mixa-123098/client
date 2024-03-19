
import { makeAutoObservable, runInAction } from "mobx";

class AuthStore {
  isAuthenticated = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  login(username) {
    this.isAuthenticated = true;
    this.user = { username };
    this.updateUserStatus("online");
    sessionStorage.setItem("user", username)
  }

  logout(username) {
    this.isAuthenticated = false;
    this.user = { username };
    this.updateUserStatus(" ");
    sessionStorage.removeItem("user")
  }

  setUsername(params) {
    this.user = params;
  }

  updateUserStatus = async (status) => {
    try {
      const response = await fetch(
        `https://server-2gn8.onrender.com/update_user_status/${this.user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        runInAction(() => {
          this.user = updatedUser;
        });
      } else {
        console.error("Failed to update user status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
}

const authStore = new AuthStore();
export default authStore;