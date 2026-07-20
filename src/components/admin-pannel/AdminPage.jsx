import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
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
import Loader from "../../loader/Loader";
// import CropImg from "./CropImg";

const AdminPage = observer(() => {
  const { t } = useTranslation();

  const { isReady, isAdmin } = authStore;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState({
    createProject: false,
    usersList: false,
    projectsEdit: false,
    cropProjectsImges: false,
  });

  useEffect(() => {
    if (isReady && !isAdmin) {
      navigate("/");
    }
  }, [navigate, isReady, isAdmin]);

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
  if (!isReady || !isAdmin) {
    return <Loader />;
  }

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
        <UsersStatus />
      </div>
      {renderButton(
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
});

export default AdminPage;
