import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import "./RegistrationForm.css";
import { useTranslation } from "react-i18next";

// Public self-registration was removed: POST /users on the server now
// requires an authenticated admin, and staff accounts are created from the
// admin panel (Users tab) instead. This form is login-only.
const AuthForm = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (authStore.isAuthenticated) {
      navigate("/edit");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    try {
      await authStore.login(username, password);
      navigate("/edit");
    } catch (error) {
      if (error.message === "user_not_found") {
        alert(t("authForm.feedbacks.userNotFound"));
      } else {
        alert(t("authForm.feedbacks.invalidPassword"));
      }
    }
  };

  return (
    <div className="reg-auth">
      <h2>{t("authForm.auth")}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("authForm.username")}</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-1">
          <label>{t("authForm.password")}:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-center mt-3 mb-4">
          <button type="submit" className="btn btn-dark">
            {t("authForm.login1")}
          </button>
        </div>
        <div onClick={() => navigate("/")}>
          <lable className="text-decoration-underline cursor-pointer">
            {t("authForm.toTheHomePage")}
          </lable>
        </div>
      </form>
    </div>
  );
});

export default AuthForm;
