import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/authStore";
import logo from "../assets/logo-removebg.png";
import ScrollToTop from "../custom-hooks/ScrollToTop";

const Navbar = observer(({ fontColor, scroll, rep }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore;
  const navbarItemsList = ["Головна", "Проекти", "Про нас", "Контакти", "Ціни"];
  const navbarItemsWays = [];

  const [onlineUser, setOnlineUser] = useState();
  console.log(onlineUser);
  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        const onlineUser = data.find(
          (user) => user.username === sessionStorage.getItem("user")
          // user.status === "online"
          //  &&
          // user.username === sessionStorage.getItem("user")
        );
        // data.find((user) => user.status === "online") || isAuthenticated;
        setOnlineUser(onlineUser);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [isAuthenticated]);
  console.log(sessionStorage.getItem("user"));
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
    navbarItemsList.push("Редагувати");
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

  const navbar = navbarItemsList.map((item, index) => {
    return (
      <Link
        key={index}
        to={`/${navbarItemsWays[index]}`}
        className="nav-link nav-styles"
        onClick={<ScrollToTop />}
      >
        <h6 style={{ color: fontColor }}>{navbarItemsList[index]}</h6>
      </Link>
    );
  });

  const handleLogout = (e) => {
    authStore.logout(onlineUser.username);
    navigate("/login");
  };

  const hamburgerMenu = navbarItemsList.map((item, index) => (
    <li key={index}>
      <a className="menu__item" href={`/${navbarItemsWays[index]}`}>
        {item}
      </a>
    </li>
  ));
  console.log(isAuthenticated);
  return (
    <>
      <nav className="navbar">
        {navbar}
        {/* {onlineUser || isAuthenticated ? ( */}
        {onlineUser || isAuthenticated ? (
          <h6
            onClick={handleLogout}
            style={{ color: fontColor }}
            className="bg-dark text-light p-2 rounded"
          >
            Вийти
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
            {onlineUser || isAuthenticated ? (
              <h6
                onClick={handleLogout}
                style={{ color: fontColor }}
                className="bg-dark text-light p-2 rounded"
              >
                Вийти
              </h6>
            ) : null}
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
          <Link to="/" onClick={<ScrollToTop />}>
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
