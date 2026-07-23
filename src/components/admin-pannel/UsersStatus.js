import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const UsersStatus = observer(() => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingUserId, setSavingUserId] = useState(null);
  const [errorUserId, setErrorUserId] = useState(null);

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

  const roleLabels = {
    moderator: t("editPage.usersList.makeModerator"),
    admin: t("editPage.usersList.makeAdministrator"),
    user: t("editPage.usersList.makeUser"),
  };

  const changeRole = async (user, newRole) => {
    if (user.id === currentUser?.id) return;
    if (!window.confirm(`${roleLabels[newRole]} — ${user.username}?`)) return;

    setErrorUserId(null);
    setSavingUserId(user.id);
    try {
      const response = await fetch(
        `${API_URL}/update_user_role/${user.username}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) throw new Error("update_failed");

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    } catch (error) {
      console.error("Error updating user role:", error);
      setErrorUserId(user.id);
    } finally {
      setSavingUserId(null);
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
          {users.map((user) => (
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
                {errorUserId === user.id && (
                  <div className="text-danger small mb-1">
                    {t("editPage.usersList.roleUpdateError")}
                  </div>
                )}
                {user.id !== currentUser?.id && (
                  <div className="d-flex gap-2 flex-wrap">
                    {user.role !== "moderator" && (
                      <button
                        onClick={() => changeRole(user, "moderator")}
                        className="btn btn-primary"
                        disabled={savingUserId === user.id}
                      >
                        {t("editPage.usersList.makeModerator")}
                      </button>
                    )}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => changeRole(user, "admin")}
                        className="btn btn-success"
                        disabled={savingUserId === user.id}
                      >
                        {t("editPage.usersList.makeAdministrator")}
                      </button>
                    )}
                    {user.role !== "user" && (
                      <button
                        onClick={() => changeRole(user, "user")}
                        className="btn btn-warning"
                        disabled={savingUserId === user.id}
                      >
                        {t("editPage.usersList.makeUser")}
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default UsersStatus;
