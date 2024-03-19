
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
    // console.log(`username ${username}`);
    this.updateUserStatus("online");
    sessionStorage.setItem("user", username)
    // localStorage.setItem("user",username)
    // console.log(localStorage.getItem('user'))
  }

  logout(username) {
    this.isAuthenticated = false;
    this.user = { username };
    this.updateUserStatus(" ");
    sessionStorage.removeItem("user")
    // localStorage.removeItem("user")
    // console.log(localStorage.getItem('user'))
  }

  setUsername(params) {
    this.user = params;
  }

  updateUserStatus = async (status) => {
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
//     // console.log(`username ${username}`);
//     this.updateUserStatus("online");
//   }

//   logout(username) {
//     this.isAuthenticated = false;
//     this.user = { username };
//     this.updateUserStatus(" ");
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
//     console.log(`username ${username}`);
//     this.updateUserStatus("online");
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.user = null;
//     this.updateUserStatus(" ");
//   }

//   setUsername(params) {
//     this.user = params;
//   }

//   updateUserStatus = async (username) => {
//     try {
//       const response = await fetch(`/update_user_status/${username}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: username }),
//       });

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
//   }

//   login(username) {
//     this.isAuthenticated = true;
//     this.user = { username };
//     console.log(`username ${username}`);
//     this.updateUserStatus("online"); // Update user status on login
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.user = null;
//     this.updateUserStatus(" "); // Update user status on logout
//   }

//   setUsername(params) {
//     this.user = params;
//   }

//   updateUserStatus = async (userStatus) => {
//     try {
//       const response = await fetch(`/update_user_status/${this.user.username}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: userStatus }),
//       });

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
//   isAuthenticated = true;
//   user = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   login(username) {
//     this.isAuthenticated = true;
//     this.user = { username };
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.user = null;
//   }
//   setAuth(params){
//     this.isAuthenticated = params;
//   }
// }

// const authStore = new AuthStore();
// export default authStore;

// import { makeAutoObservable, runInAction } from "mobx";

// class AuthStore {
//   isAuthenticated = false;
//   user = null;

//   constructor() {
//     makeAutoObservable(this);
//     this.checkAuthentication();
//   }

//   login(username) {
//     this.isAuthenticated = true;
//     this.user = { username };
//   }

//   logout() {
//     this.isAuthenticated = false;
//     this.user = null;
//   }

//   checkAuthentication() {
//     fetch(`http://localhost:3001/users`)
//       .then((response) => response.json())
//       .then((data) => {
//         const loggedUser = data.find((user) => user.status === "online");
//         if (loggedUser !== undefined && this) {
//           runInAction(() => {
//             this.isAuthenticated = true;
//             console.log(this.isAuthenticated);
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error during authentication check:", error);
//       });
//   }
// }

// const authStore = new AuthStore();
// export default authStore;
