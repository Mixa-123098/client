import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const ROLES = ["user", "moderator", "admin"];

const UsersStatus = observer(() => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingUserId, setSavingUserId] = useState(null);
  const [errorUserId, setErrorUserId] = useState(null);
  const [resetErrorUserId, setResetErrorUserId] = useState(null);
  const [resetResult, setResetResult] = useState(null); // { username, tempPassword } | null
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [createStatus, setCreateStatus] = useState("idle"); // idle | submitting | error
  const [createError, setCreateError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const roleLabels = {
    admin: t("editPage.usersList.roleAdmin"),
    moderator: t("editPage.usersList.roleModerator"),
    user: t("editPage.usersList.roleUser"),
  };
  const roleActionLabels = {
    admin: t("editPage.usersList.makeAdministrator"),
    moderator: t("editPage.usersList.makeModerator"),
    user: t("editPage.usersList.makeUser"),
  };

  const fetchUsers = async () => {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleResetPassword = async (user) => {
    if (
      !window.confirm(
        `${t("editPage.usersList.resetPasswordConfirm")} "${user.username}"?`
      )
    )
      return;

    setResetErrorUserId(null);
    setResetResult(null);
    setSavingUserId(user.id);
    try {
      const response = await fetch(
        `${API_URL}/admin_reset_password/${user.username}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("reset_failed");
      const data = await response.json();
      setResetResult({ username: user.username, tempPassword: data.tempPassword });
    } catch (error) {
      console.error("Error resetting password:", error);
      setResetErrorUserId(user.id);
    } finally {
      setSavingUserId(null);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateStatus("submitting");
    setCreateError("");
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.error === "username_taken") {
          setCreateError(t("authForm.feedbacks.usernameTaken"));
        } else if (data.error === "email_taken") {
          setCreateError(t("authForm.feedbacks.emailTaken"));
        } else {
          setCreateError(t("editPage.usersList.createUserError"));
        }
        setCreateStatus("error");
        return;
      }

      setNewUser({ username: "", email: "", password: "" });
      setCreateStatus("idle");
      setShowCreateForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setCreateError(t("editPage.usersList.createUserError"));
      setCreateStatus("error");
    }
  };

  const currentUser = users.find(
    (user) => user.username === authStore.user?.username
  );

  const changeRole = async (user, newRole) => {
    if (user.id === currentUser?.id || newRole === user.role) return;
    if (!window.confirm(`${roleActionLabels[newRole]} — ${user.username}?`)) return;

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

  const visibleUsers = users.filter((user) => {
    const matchesSearch = user.username
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 mb-4">
      <h1>{t("editPage.usersList.users")}</h1>

      {resetResult && (
        <div className="alert alert-success" role="alert">
          <div>
            {t("editPage.usersList.resetPasswordSuccess")}{" "}
            <b>{resetResult.username}</b>:{" "}
            <code>{resetResult.tempPassword}</code>
          </div>
          <div className="small mt-1">
            {t("editPage.usersList.resetPasswordNote")}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-success mt-2"
            onClick={() => setResetResult(null)}
          >
            {t("editPage.usersList.ok")}
          </button>
        </div>
      )}

      <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: 260 }}
          placeholder={t("editPage.usersList.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: 180 }}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">{t("editPage.usersList.filterAllRoles")}</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {roleLabels[role]}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-dark ms-auto"
          onClick={() => setShowCreateForm((prev) => !prev)}
        >
          {t("editPage.usersList.createUser")}
        </button>
      </div>

      {showCreateForm && (
        <div className="card card-body mb-3">
          {createStatus === "error" && (
            <div className="alert alert-danger" role="alert">
              {createError}
            </div>
          )}
          <form
            onSubmit={handleCreateUser}
            className="row g-2 align-items-center"
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder={t("authForm.username")}
                value={newUser.username}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, username: e.target.value }))
                }
                disabled={createStatus === "submitting"}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={createStatus === "submitting"}
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="password"
                className="form-control"
                placeholder={t("authForm.password")}
                value={newUser.password}
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
                disabled={createStatus === "submitting"}
                required
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-dark d-flex align-items-center gap-2"
                disabled={createStatus === "submitting"}
              >
                {createStatus === "submitting" && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {t("editPage.usersList.createUserSubmit")}
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="table align-middle">
        <thead>
          <tr>
            <th>{t("editPage.usersList.username")}</th>
            <th>{t("editPage.usersList.role")}</th>
            <th className="text-end">{t("editPage.usersList.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map((user) => {
            const isSelf = user.id === currentUser?.id;
            return (
              <tr key={user.id}>
                <td>
                  {user.username}{" "}
                  {authStore.user?.username === user.username && (
                    <span className="text-muted small">
                      ({t("editPage.usersList.itsYou")})
                    </span>
                  )}
                  {errorUserId === user.id && (
                    <div className="text-danger small">
                      {t("editPage.usersList.roleUpdateError")}
                    </div>
                  )}
                  {resetErrorUserId === user.id && (
                    <div className="text-danger small">
                      {t("editPage.usersList.resetPasswordError")}
                    </div>
                  )}
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ maxWidth: 160 }}
                    value={user.role}
                    disabled={isSelf || savingUserId === user.id}
                    onChange={(e) => changeRole(user, e.target.value)}
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {roleLabels[role]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="text-end">
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      disabled={savingUserId === user.id}
                    >
                      &#8942;
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleResetPassword(user)}
                        >
                          {t("editPage.usersList.resetPassword")}
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
          {visibleUsers.length === 0 && (
            <tr>
              <td colSpan={3} className="text-muted text-center">
                {t("editPage.usersList.noResults")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default UsersStatus;
