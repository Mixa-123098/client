import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const UsersStatus = observer(() => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentUser = users.find(
    (user) => user.username === authStore.user?.username
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
      const response = await fetch(`${API_URL}/users`, {
        credentials: "include",
      });
      const updatedData = await response.json();

      const isDataChanged =
        JSON.stringify(updatedData) !== JSON.stringify(users);

      if (isDataChanged) {
        const updatePromises = updatedData.map(async (updatedUser) => {
          const currentUser = users.find((user) => user.id === updatedUser.id);
          const role =
            currentUser !== undefined ? currentUser.role : updatedUser.role;

          const putResponse = await fetch(
            `${API_URL}/update_user_role/${updatedUser.username}`,
            {
              method: "PUT",
              credentials: "include",
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
    return <div>Loading...</div>;
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
                  {authStore.user?.username === user.username && (
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
});

export default UsersStatus;
