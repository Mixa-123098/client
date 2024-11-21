import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import logo from "../assets/logo-removebg.png";
import ScrollToTop from "../custom-hooks/ScrollToTop";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navbar = observer(({ fontColor, scroll, rep }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = authStore;
  const navbarItemsList = [
    t("navbar.mainPage"),
    t("navbar.projectsPage"),
    t("navbar.aboutPage"),
    t("navbar.contactsPage"),
    t("navbar.pricesPage"),
  ];

  const navbarItemsWays = [];
  const [onlineUser, setOnlineUser] = useState(null);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        const onlineUser = data.find((user) => user.status === "online");
        const usernameCookie = getCookie("username");
        if (onlineUser && onlineUser.username === usernameCookie) {
          authStore.isAuthenticated = true;
          if (onlineUser.role === "admin") {
            authStore.isAdmin = true;
          }

          setOnlineUser(onlineUser);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (onlineUser && onlineUser.role === "user") {
    navbarItemsWays.push(
      " ",
      "projects",
      "about",
      "contacts",
      "price",
      "|there must be a search|"
    );
  } else if (onlineUser || isAuthenticated === true) {
    navbarItemsList.push(t("navbar.editPage"));
    navbarItemsWays.push(
      " ",
      "projects",
      "about",
      "contacts",
      "price",
      "edit",
      "|there must be a search|"
    );
  } else {
    navbarItemsWays.push(
      " ",
      "projects",
      "about",
      "contacts",
      "price",
      "|there must be a search|"
    );
  }

  // if (onlineUser && onlineUser.role === "user") {
  //   navbarItemsWays.push(
  //     " ",
  //     "projects",
  //     "about",
  //     "contacts",
  //     "price",
  //     "|there must be a search|"
  //   );
  // } else if (onlineUser || isAuthenticated === true) {
  //   navbarItemsList.push("Редагувати");
  //   navbarItemsWays.push(
  //     " ",
  //     "projects",
  //     "about",
  //     "contacts",
  //     "price",
  //     "edit",
  //     "|there must be a search|"
  //   );
  // } else {
  //   navbarItemsWays.push(
  //     " ",
  //     "projects",
  //     "about",
  //     "contacts",
  //     "price",
  //     "|there must be a search|"
  //   );
  // }

  const navbar = navbarItemsList.map((item, index) => {
    return (
      <Link
        key={index}
        to={`/${navbarItemsWays[index]}`}
        className="nav-link nav-styles"
        onClick={ScrollToTop}
      >
        <h6 style={{ color: fontColor }}>{navbarItemsList[index]}</h6>
      </Link>
    );
  });

  const handleLogout = (e) => {
    authStore.logout(onlineUser.username);
    // console.log(onlineUser.username);

    navigate("/login");
  };

  const hamburgerMenu = navbarItemsList.map((item, index) => (
    <li key={index}>
      <a className="menu__item" href={`/${navbarItemsWays[index]}`}>
        {item}
      </a>
    </li>
  ));
  // console.log(isAuthenticated);
  return (
    <>
      <nav className="navbar">
        {navbar}
        <LanguageSelector />
        {onlineUser || isAuthenticated ? (
          <h6
            onClick={handleLogout}
            style={{ color: fontColor }}
            className="bg-dark text-light p-2 rounded"
          >
            {t("navbar.logoutButton")}
          </h6>
        ) : null}
      </nav>

      <nav className="navbar-hamburger">
        <div className="d-flex align-items-center justify-content-between">
          <input id="menu__toggle" type="checkbox" />
          <label
            className={
              scroll === 0 && rep === true ? `menu__btn2` : `menu__btn`
            }
            htmlFor="menu__toggle"
          >
            <span></span>
          </label>

          <ul className="menu__box">
            {hamburgerMenu}
            {isAuthenticated ? (
              <h6
                onClick={handleLogout}
                style={{ color: fontColor }}
                className="bg-dark text-light p-2 rounded"
              >
                {t("navbar.logoutButton")}
              </h6>
            ) : null}
            <LanguageSelector />
          </ul>
        </div>
      </nav>
    </>
  );
});

function Header({ fontColor, invert, rep }) {
  const [scroll, setScroll] = useState(0);
  let opacity;
  useEffect(() => {
    const handleScroll = (event) => {
      setScroll(window.pageYOffset / 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);
  if (scroll >= 1) {
    opacity = 1;
  } else {
    opacity = scroll;
  }

  return (
    <div className="">
      <div className="smooth-background" style={{ opacity }}></div>
      <header className="header">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" onClick={ScrollToTop}>
            <img
              src={logo}
              alt="logo"
              className="header-logo"
              style={{ filter: scroll === 0 ? invert : `invert(100%)` }}
            />
          </Link>
          <Navbar
            fontColor={scroll === 0 ? fontColor : `white`}
            scroll={scroll}
            rep={rep}
          />
        </div>
      </header>
    </div>
  );
}

export default Header;
