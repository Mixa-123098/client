import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authStore from "../../store/authStore";
import { API_URL } from "../../config/api";

const ChangePasswordForm = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setStatus("error");
      setErrorMessage(t("editPage.changePassword.tooShort"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setErrorMessage(t("editPage.changePassword.mismatch"));
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    try {
      const response = await fetch(`${API_URL}/me/password`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.error === "invalid_current_password") {
          throw new Error(t("editPage.changePassword.wrongCurrent"));
        }
        throw new Error(t("editPage.changePassword.error"));
      }

      authStore.clearMustChangePassword();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 420 }}>
      <h2>{t("editPage.changePassword.title")}</h2>

      {status === "success" && (
        <div className="alert alert-success" role="alert">
          {t("editPage.changePassword.success")}
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">
            {t("editPage.changePassword.current")}
          </label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            {t("editPage.changePassword.new")}
          </label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            {t("editPage.changePassword.confirm")}
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark d-flex align-items-center gap-2"
          disabled={status === "submitting"}
        >
          {status === "submitting" && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {t("editPage.changePassword.submit")}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
