import { useState, useEffect } from "react";

const IsUserLoggedIn = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://server-2gn8.onrender.com/users`);
        const data = await response.json();
        const user = data.find((user) => user.status === "online");
        setIsAuth(user ? true : false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuth(false); 
      }
    };

    fetchData();
  }, []); 

  return isAuth;
};

export default IsUserLoggedIn;
// import { useState, useEffect } from "react";

// const IsUserLoggedIn = () => {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://server-2gn8.onrender.com/users`);
//         const data = await response.json();
//         const user = data.find((user) => user.status === "online");
//         setIsAuth(user ? true : false);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setIsAuth(false); // Handle error by setting isAuth to false
//       }
//     };

//     fetchData();
//   }, []);

//   return isAuth;
// };

// export default IsUserLoggedIn;
// import { useState, useEffect } from "react";

// const IsUserLoggedIn = () => {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://server-2gn8.onrender.com/users`);
//         const data = await response.json();
//         const user = data.find((user) => user.status === "online");
//         setIsAuth(user ? true : false);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setIsAuth(false); // Handle error by setting isAuth to false
//       }
//     };

//     fetchData();
//   }, []);

//   return isAuth;
// };

// export default IsUserLoggedIn;

// import { useState, useEffect } from "react";

// const IsUserLoggedIn = () => {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     fetch(`https://server-2gn8.onrender.com/users`)
//       .then((response) => response.json())
//       .then((data) => {
//         const user = data.find((user) => user.status === "online");
//         setIsAuth(user ? true : false);
//       });
//   }, []);

//   return isAuth;
// };

// export default IsUserLoggedIn;

// import { useState, useEffect } from "react";

// const IsUserLoggedIn = () => {
//     const [usersData, setUsersData] = useState([]);
//     const [isAuth, setIsAuth] = useState([]);

//   useEffect(() => {
//     fetch(`https://server-2gn8.onrender.com/users`)
//       .then((response) => response.json())
//       .then((data) =>
//         setUsersData(data.find((user) => user.status === "online"))
//       );
//       const user = usersData ? true : false;
//       setIsAuth(user)
//   }, []);

//   return isAuth;
// };

// export default IsUserLoggedIn;

// CustomHook.js
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import authStore from "../../store/authStore";

// const isUserLoggedIn = () => {
//   const [isAuthenticated, setAuthenticated] = useState(false);
// //   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`https://server-2gn8.onrender.com/users`)
//       .then((response) => response.json())
//       .then((data) => {
//         const user = data.find((user) => user.status === "online");
//         setAuthenticated(!!user);

//         // if (!user) {
//         //   navigate("/login");
//         // }
//       });
//   }, []);

//   return isAuthenticated;
// };

// export default isUserLoggedIn;
