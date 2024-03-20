import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import "./RegistrationForm.css";

const AuthForm = observer(() => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  console.log(formData);
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = authStore;
  // console.log(usersData);
  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        const onlineUser =
          // data.find((user) => user.status === "online" && user.username===authStore.user.username) || isAuthenticated;
          // console.log(sessionStorage.getItem("user"));
          data.find(
            (user) =>
              user.status === "online" &&
              user.username === sessionStorage.getItem("user")
          );
          console.log(onlineUser);
        // data.find((user) => user.status === "online") || isAuthenticated;
        if (onlineUser) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    fetch(`https://server-2gn8.onrender.com/users`)
      .then((response) => response.json())
      .then((data) => setUsersData(data));
  }, [isAuthenticated, navigate]);

  const [isRegistration, setIsRegistration] = useState(true);

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
        alert("This username is already taken. Please choose a different one.");
      } else if (isEmailTaken) {
        alert(
          "This email is already associated with an account. Please use a different email."
        );
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
        alert("Тепер ви зареєстровані - увійдіть в аккаунт");
      }
    } else {
      const { username, password } = formData;

      const user = usersData.find((user) => user.username === username);
      if (user) {
        if (user.password === password) {
          navigate("/edit");

          authStore.login(user.username);
        } else {
          alert("Невірний пароль. Будь ласка, перевірте свої облікові дані.");
        }
      } else {
        alert("Користувача з таким ім'ям користувача не знайдено.");
      }
    }
  };

  return (
    <div className="reg-auth">
      <h2>{isRegistration ? "Реєстрація" : "Авторизація"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я користувача:</label>
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
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-center mt-3 mb-4">
          <button type="submit" className="btn btn-dark">
            {isRegistration ? "Зареєструватися" : "Увійти"}
          </button>
        </div>
        <p className="text-center">
          {isRegistration ? "Вже маєте аккаунт? " : "Немає аккаунту? "}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsRegistration(!isRegistration)}
          >
            {isRegistration ? "Увійдіть" : "Зареєструйтеся"}
          </button>
        </p>
        <div onClick={() => navigate("/")}>
          <lable className="text-decoration-underline cursor-pointer">
            На головну сторінку
          </lable>
        </div>
      </form>
    </div>
  );
});

export default AuthForm;
