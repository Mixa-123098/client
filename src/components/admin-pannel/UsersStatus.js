import React, { useState, useEffect } from "react";
import authStore from "../../store/authStore";
import { useTranslation } from "react-i18next";

const UsersStatus = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  // const [onlineUser, setOnlineUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки данных

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users`);
        const data = await response.json();
        setUsers(data);

        const onlineUser = data.find((user) => user.status === "online");
        const usernameCookie = getCookie("username");
        if (onlineUser && onlineUser.username === usernameCookie) {
          authStore.isAuthenticated = true;
          if (onlineUser.role === "admin") {
            authStore.isAdmin = true;
            console.log(onlineUser.role);
          }
          // setOnlineUser(onlineUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    fetchData();
  }, []);

  const currentUser = users.find(
    (user) => user.username === sessionStorage.getItem("user")
  );

  const changeStatus = (userId, newRole) => {
    if (userId === currentUser?.id) {
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );

    setUsers(updatedUsers);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/users`);
      const updatedData = await response.json();

      const isDataChanged =
        JSON.stringify(updatedData) !== JSON.stringify(users);

      if (isDataChanged) {
        const updatePromises = updatedData.map(async (updatedUser) => {
          const currentUser = users.find((user) => user.id === updatedUser.id);
          const role =
            currentUser !== undefined ? currentUser.role : updatedUser.role;

          const putResponse = await fetch(
            `http://localhost:3001/update_user_role/${updatedUser.username}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ role }),
            }
          );

          const putResult = await putResponse.json();
          console.log("PUT Request Result:", putResult);
        });

        await Promise.all(updatePromises);
      } else {
        alert(t("editPage.usersList.noChanges"));
      }
    } catch (error) {
      console.error("Error updating user roles:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Показать индикатор загрузки
  }

  return (
    <div className="container mt-4 mb-4">
      <h1>{t("editPage.usersList.users")}</h1>
      <table className="table">
        <thead>
          <tr>
            <th>{t("editPage.usersList.username")}</th>
            <th>{t("editPage.usersList.role")}</th>
            <th>{t("editPage.usersList.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.username}{" "}
                  {sessionStorage.getItem("user") === user.username && (
                    <span> ({t("editPage.usersList.itsYou")})</span>
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
                          disabled={user.id === currentUser?.id}
                        >
                          {t("editPage.usersList.makeModerator")}
                        </button>
                      )}
                      {user.role !== "admin" && (
                        <button
                          onClick={() => changeStatus(user.id, "admin")}
                          className="btn btn-success"
                          disabled={user.id === currentUser?.id}
                        >
                          {t("editPage.usersList.makeAdministrator")}
                        </button>
                      )}
                      {user.role !== "user" && (
                        <button
                          onClick={() => changeStatus(user.id, "user")}
                          className="btn btn-warning"
                          disabled={user.id === currentUser?.id}
                        >
                          {t("editPage.usersList.makeUser")}
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
        {t("editPage.usersList.confirm")}
      </button>
    </div>
  );
};

export default UsersStatus;
