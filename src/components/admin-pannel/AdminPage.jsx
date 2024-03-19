import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../store/authStore";
import Header from "../Header";
import PagesHeader from "../Pages/PagesHeader";
import CreateProject from "./CreateProject";
import UsersStatus from "./UsersStatus";
import ProjectsEdit from "./ProjectsEdit";
import Footer from "../Footer";
import CropModalForm from "./CropModalForm";
import CropImgesComponent from "./CropImgesComponent";
import CropImg from "./CropImg";

const AdminPage = () => {
  const { isAuthenticated } = authStore;
  const navigate = useNavigate();
  const [onlineUser, setOnlineUser] = useState();
  const [isOpen, setIsOpen] = useState({
    createProject: false,
    usersList: false,
    projectsEdit: false,
    cropProjectsImges: false,
  });

  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        const onlineUser =
          data.find((user) => user.token === sessionStorage.getItem("user")) ||
          isAuthenticated;

        if (!onlineUser || onlineUser.role === "user") {
          navigate("/login");
        }

        setOnlineUser(onlineUser);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [navigate, isAuthenticated]);

  const handleclick = (event) => {
    setIsOpen((prev) => ({ ...prev, [event]: !prev[event] }));
  };

  const renderButton = (id, text, isOpenKey) => (
    <div className="d-flex container mt-5" key={id}>
      <button
        className={`btn ${isOpen[isOpenKey] ? "btn-secondary" : "btn-dark"}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${id}`}
        aria-expanded="false"
        aria-controls="collapseExample"
        onClick={() => handleclick(isOpenKey)}
      >
        {!isOpen[isOpenKey] ? `Відкрити ${text}` : `Закрити ${text}`}
      </button>
    </div>
  );

  return (
    <>
      <Header fontColor="#000000" invert="invert(0%)" rep={true}/>
      <PagesHeader title="Панель адміністрування" />

      <div className="collapse" id="CreateProject">
        <CreateProject />
      </div>
      {renderButton("CreateProject", "створення проєкту", "createProject")}

      <div className="collapse" id="usersList">
        {onlineUser && onlineUser.role === "admin" && <UsersStatus />}
      </div>
      {onlineUser &&
        onlineUser.role === "admin" &&
        renderButton("usersList", "список користувачів", "usersList")}

      <div className="collapse" id="projectsEdit">
        <ProjectsEdit />
      </div>
      {renderButton("projectsEdit", "редагування проєкту", "projectsEdit")}

      <div className="collapse" id="cropProjectsImges">
        <CropImgesComponent />
      </div>
      <div className="mb-5">
        {renderButton(
          "cropProjectsImges",
          "обрізку фотографій проєкту",
          "cropProjectsImges"
        )}
      </div>

      <CropModalForm />
      {/* <CropImg /> */}
      <Footer settings={{ color: "black", bgColor: "white", shadow: true }} />
    </>
  );
};

export default AdminPage;
