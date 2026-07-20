import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import "./RegistrationForm.css";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const AuthForm = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authStore.isAuthenticated) {
      navigate("/edit");
    }
  }, [navigate]);

  const [isRegistration, setIsRegistration] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistration) {
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFormData({ username: "", email: "", password: "" });
          alert(t("authForm.feedbacks.registrationSuccess"));
          setIsRegistration(false);
        } else if (data.error === "username_taken") {
          alert(t("authForm.feedbacks.usernameTaken"));
        } else if (data.error === "email_taken") {
          alert(t("authForm.feedbacks.emailTaken"));
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
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
    }
  };

  return (
    <div className="reg-auth">
      <h2>
        {isRegistration ? t("authForm.registration") : t("authForm.auth")}
      </h2>
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

        {isRegistration && (
          <div className="mt-1">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}

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
            {isRegistration ? t("authForm.register1") : t("authForm.login1")}
          </button>
        </div>
        <p className="text-center">
          {isRegistration
            ? t("authForm.haveAnAccount")
            : t("authForm.dontHaveAnAccount")}
          {"    "}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsRegistration(!isRegistration)}
          >
            {isRegistration ? t("authForm.login2") : t("authForm.register2")}
          </button>
        </p>
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
