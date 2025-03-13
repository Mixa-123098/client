import { makeAutoObservable, runInAction, action } from "mobx";

class AuthStore {
  isAuthenticated = false;
  isAdmin = false;

  user = null;

  constructor() {
    makeAutoObservable(this, {
      // Explicitly define actions if not using makeAutoObservable
      login: action,
      logout: action,
    });
  }

  login(username) {
    console.log(username);
    this.isAuthenticated = true;
    this.user = { username };
    this.updateUserStatus("online");
    sessionStorage.setItem("user", username);
    document.cookie = `username=${username}; expires=${new Date(
      Date.now() + 86400e3
    ).toUTCString()}`;
  }

  logout(username) {
    this.isAuthenticated = false;
    // console.log(this.isAuthenticated);

    this.user = { username };
    this.updateUserStatus(" ");
    sessionStorage.removeItem("user");
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  setUsername(params) {
    this.user = params;
  }

  updateUserStatus = async (status) => {
    console.log(status);
    try {
      const response = await fetch(
        `http://localhost:3001/update_user_status/${this.user.username}`,
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

// import { makeAutoObservable, runInAction } from "mobx";

// class AuthStore {
//   isAuthenticated = false;
//   user = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   login(username) {
//     this.isAuthenticated = true;
//     this.user = { username };
//     this.updateUserStatus("online");
//     sessionStorage.setItem("user", username)
//   }

//   logout(username) {
//     this.isAuthenticated = false;
//     this.user = { username };
//     this.updateUserStatus(" ");
//     sessionStorage.removeItem("user")
//   }

//   setUsername(params) {
//     this.user = params;
//   }

//   updateUserStatus = async (status) => {
//     console.log(status);
//     try {
//       const response = await fetch(
//         `http://localhost:3001/update_user_status/${this.user.username}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: status }),
//         }
//       );

//       if (response.ok) {
//         const updatedUser = await response.json();
//         runInAction(() => {
//           this.user = updatedUser;
//         });
//       } else {
//         console.error("Failed to update user status:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating user status:", error);
//     }
//   };
// }

// const authStore = new AuthStore();
// export default authStore;

// import { makeAutoObservable, runInAction } from "mobx";

// class AuthStore {
//   isAuthenticated = false;
//   user = null;

//   constructor() {
//     makeAutoObservable(this);
//     // Initialize user from cookie if available
//     const cookieUser = this.getCookie("user");
//     if (cookieUser) {
//       this.user = JSON.parse(cookieUser);
//       this.isAuthenticated = true;
//     }
//   }

//   setCookie(name, value, days) {
//     const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
//     document.cookie = `${name}=${JSON.stringify(value)}; expires=${expires}; path=/`;
//   }

//   getCookie(name) {
//     const cookies = document.cookie.split(";").map(cookie => cookie.trim());
//     for (const cookie of cookies) {
//       if (cookie.startsWith(name + "=")) {
//         return cookie.substring(name.length + 1);
//       }
//     }
//     return null;
//   }

//   login(username) {
//     this.isAuthenticated = true;
//     this.user = { username };
//     this.updateUserStatus("online");
//     this.setCookie("user", this.user, 7); // Set cookie to expire in 7 days
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.user = null;
//     this.updateUserStatus("offline");
//     this.setCookie("user", "", -1); // Clear the cookie by setting it to expire immediately
//   }

//   setUsername(params) {
//     this.user = params;
//   }

//   updateUserStatus = async (status) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/update_user_status/${this.user.username}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: status }),
//         }
//       );

//       if (response.ok) {
//         const updatedUser = await response.json();
//         runInAction(() => {
//           this.user = updatedUser;
//         });
//       } else {
//         console.error("Failed to update user status:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating user status:", error);
//     }
//   };
// }

// const authStore = new AuthStore();
// export default authStore;
