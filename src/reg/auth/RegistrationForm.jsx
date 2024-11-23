import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import "./RegistrationForm.css";
import { useTranslation } from "react-i18next";

const AuthForm = observer(() => {
  const { t } = useTranslation();

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("https://server-2gn8.onrender.com/users")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const onlineUser = data.find((user) => user.status === "online");
  //       console.log(onlineUser);
  //       const usernameCookie = getCookie('username');
  //       // console.log(onlineUser);
  //       if (onlineUser) {
  //         if (usernameCookie === onlineUser.username) {
  //           authStore.isAuthenticated = true;
  //         }
  //         navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  //   fetch(`https://server-2gn8.onrender.com/users`)
  //     .then((response) => response.json())
  //     .then((data) => setUsersData(data));
  // }, [navigate]);

  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const onlineUser = data.find((user) => user.status === "online");
        const usernameCookie = getCookie("username");
        if (onlineUser && usernameCookie === onlineUser.username) {
          authStore.isAuthenticated = true;
          navigate("/");
        }
        setUsersData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, [navigate]);

  const [isRegistration, setIsRegistration] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistration) {
      const isUsernameTaken = usersData.some(
        // eslint-disable-next-line eqeqeq
        (user) => user.username == formData.username
      );
      const isEmailTaken = usersData.some(
        // eslint-disable-next-line eqeqeq
        (user) => user.email == formData.email
      );

      if (isUsernameTaken) {
        alert(t("authForm.feedbacks.usernameTaken"));
      } else if (isEmailTaken) {
        alert(t("authForm.feedbacks.emailTaken"));
      } else {
        fetch("https://server-2gn8.onrender.com/users", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setUsersData([...usersData, formData]);
              setFormData({ username: "", email: "", password: "" });
            }
          });
        alert(t("authForm.feedbacks.registrationSuccess"));
      }
    } else {
      const { username, password } = formData;

      const user = usersData.find((user) => user.username === username);
      if (user) {
        if (user.password === password) {
          navigate("/edit");

          authStore.login(user.username);
        } else {
          alert(t("authForm.feedbacks.invalidPassword"));
        }
      } else {
        alert(t("authForm.feedbacks.userNotFound"));
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
