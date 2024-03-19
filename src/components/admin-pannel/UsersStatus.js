import React, { useState, useEffect } from "react";

const UsersStatus = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://server-2gn8.onrender.com/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const currentUser = users.find(
    (user) => user.username === sessionStorage.getItem("user")
  );

  const changeStatus = (userId, newRole) => {
    if (userId === currentUser.id) {
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );

    setUsers(updatedUsers);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`https://server-2gn8.onrender.com/users`);
    const updatedData = await response.json();
  
    const isDataChanged = JSON.stringify(updatedData) !== JSON.stringify(users);
  
    if (isDataChanged) {
      const updatePromises = updatedData.map(async (updatedUser) => {
        const currentUser = users.find((user) => user.id === updatedUser.id);
        const role = currentUser !== undefined ? currentUser.role : updatedUser.role;
  
        const putResponse = await fetch(`https://server-2gn8.onrender.com/update_user_role/${updatedUser.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role }),
        });
  
        const putResult = await putResponse.json();
        console.log("PUT Request Result:", putResult);  
      });
  
      await Promise.all(updatePromises);
    } else {
      console.log("Data has not changed.");
      alert("Ви нічого не змінили");
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch(`https://server-2gn8.onrender.com/users`);
  //   const updatedData = await response.json();

  //   const isDataChanged = JSON.stringify(updatedData) !== JSON.stringify(users);

  //   if (isDataChanged) {
  //     const changedUsers = updatedData.map((updatedUser) => {
  //       const currentUser = users.find((user) => user.id === updatedUser.id);
  //       return currentUser !== undefined ? currentUser : updatedUser;
  //     });

  //     changedUsers.forEach(async (changedUser) => {
  //       const putResponse = await fetch(`https://server-2gn8.onrender.com/update_user_role/${changedUser.username}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ role: changedUser.role }), 
  //       });
  //       console.log(changedUser.role);
  //       const putResult = await putResponse.json();
  //       console.log("PUT Request Result:", putResult);
  //     });
      
  //   } else {
  //     console.log("Data has not changed.");
  //     alert("Ви нічого не змінили");
  //   }
  // };

  return (
    <div className="container mt-4 mb-4">
      <h1>Список користувачів</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Ім'я користувача</th>
            <th>Роль</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.username}{" "}
                {sessionStorage.getItem("user") === user.username && (
                  <span> (це ви)</span>
                )}
              </td>
              <td>
                <b>{user.role}</b>
              </td>
              <td>
                {!currentUser || user.id !== currentUser.id ? (
                  <>
                    {user.role !== "moderator" && (
                      <button
                        onClick={() => changeStatus(user.id, "moderator")}
                        className="btn btn-primary"
                        disabled={user.id === currentUser.id}
                      >
                        Зробити модератором
                      </button>
                    )}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => changeStatus(user.id, "admin")}
                        className="btn btn-success"
                        disabled={user.id === currentUser.id}
                      >
                        Зробити адміністратором
                      </button>
                    )}
                    {user.role !== "user" && (
                      <button
                        onClick={() => changeStatus(user.id, "user")}
                        className="btn btn-warning"
                        disabled={user.id === currentUser.id}
                      >
                        Зробити звичайним користувачем
                      </button>
                    )}
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" onClick={handleFormSubmit} className="btn btn-dark">
        Підтвердити зміни
      </button>
    </div>
  );
};

export default UsersStatus;
