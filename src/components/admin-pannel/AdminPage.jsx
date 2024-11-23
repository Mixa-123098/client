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
import { useTranslation } from "react-i18next";
// import CropImg from "./CropImg";

const AdminPage = () => {
  const { t } = useTranslation();
  const open_close = t("editPage.createNewProject.open_close");

  const { isAuthenticated, isAdmin } = authStore;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
          navigate("/");
        }
        console.log(onlineUser.role);

        if (onlineUser.role === "admin") {
          authStore.isAdmin = true;
          // console.log(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
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
        {!isOpen[isOpenKey]
          ? `${t("editPage.createNewProject.open")} ${text}`
          : `${t("editPage.createNewProject.close")} ${text}`}
      </button>
    </div>
  );
  if (loading) {
    return <div> Loading... </div>;
  }
  // console.log(open_close);

  return (
    <>
      <Header fontColor="#000000" invert="invert(0%)" rep={true} />
      <PagesHeader title={t("editPage.adminPanel")} />

      <div className="collapse" id="CreateProject">
        <CreateProject />
      </div>
      {renderButton(
        "CreateProject",
        t("editPage.createNewProject.open_close"),
        "createProject"
      )}

      <div className="collapse" id="usersList">
        {isAdmin && isAdmin === true && <UsersStatus />}
      </div>
      {isAdmin &&
        isAdmin === true &&
        renderButton(
          "usersList",
          t("editPage.usersList.open_close"),
          "usersList"
        )}

      <div className="collapse" id="projectsEdit">
        <ProjectsEdit />
      </div>
      {renderButton(
        "projectsEdit",
        t("editPage.editProject.open_close"),
        "projectsEdit"
      )}

      <div className="collapse" id="cropProjectsImges">
        <CropImgesComponent />
      </div>
      <div className="mb-5">
        {renderButton(
          "cropProjectsImges",
          t("editPage.cropImages.open_close"),
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
