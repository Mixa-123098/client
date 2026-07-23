import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import Header from "../Header";
import PagesHeader from "../Pages/PagesHeader";
import CreateProject from "./CreateProject";
import UsersStatus from "./UsersStatus";
import ProjectsEdit from "./ProjectsEdit";
import LanguagesManager from "./LanguagesManager";
import Footer from "../Footer";
import CropModalForm from "./CropModalForm";
import CropImgesComponent from "./CropImgesComponent";
import ChangePasswordForm from "./ChangePasswordForm";
import { useTranslation } from "react-i18next";
import Loader from "../../loader/Loader";

const AdminPage = observer(() => {
  const { t } = useTranslation();

  const { isReady, isAdmin, mustChangePassword } = authStore;
  const navigate = useNavigate();

  const tabs = [
    {
      key: "createProject",
      label: t("editPage.createNewProject.open_close"),
      Component: CreateProject,
    },
    {
      key: "usersList",
      label: t("editPage.usersList.open_close"),
      Component: UsersStatus,
    },
    {
      key: "projectsEdit",
      label: t("editPage.editProject.open_close"),
      Component: ProjectsEdit,
    },
    {
      key: "cropProjectsImges",
      label: t("editPage.cropImages.open_close"),
      Component: CropImgesComponent,
    },
    {
      key: "languages",
      label: t("editPage.languages.title"),
      Component: LanguagesManager,
    },
    {
      key: "changePassword",
      label: t("editPage.changePassword.open_close"),
      Component: ChangePasswordForm,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  // Non-admins normally have nowhere to go in the admin panel — but if they
  // were just password-reset, they still need to land here long enough to
  // change it, so the redirect is held off until that's resolved.
  useEffect(() => {
    if (isReady && !isAdmin && !mustChangePassword) {
      navigate("/");
    }
  }, [navigate, isReady, isAdmin, mustChangePassword]);

  if (!isReady) {
    return <Loader />;
  }

  if (mustChangePassword) {
    return (
      <>
        <Header fontColor="#000000" invert="invert(0%)" rep={true} />
        <PagesHeader title={t("editPage.changePassword.title")} />
        <div className="container mt-5 mb-5">
          <p className="text-muted">{t("editPage.changePassword.forcedHint")}</p>
          <ChangePasswordForm
            onSuccess={() => {
              if (!isAdmin) navigate("/");
            }}
          />
        </div>
        <Footer settings={{ color: "black", bgColor: "white", shadow: true }} />
      </>
    );
  }

  if (!isAdmin) {
    return <Loader />;
  }

  const ActiveComponent = tabs.find((tab) => tab.key === activeTab).Component;

  return (
    <>
      <Header fontColor="#000000" invert="invert(0%)" rep={true} />
      <PagesHeader title={t("editPage.adminPanel")} />

      <div className="container mt-5">
        <ul className="nav nav-tabs admin-tabs flex-wrap">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                type="button"
                className={`nav-link${activeTab === tab.key ? " active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="admin-tab-content">
          <ActiveComponent />
        </div>
      </div>

      <CropModalForm />
      <Footer settings={{ color: "black", bgColor: "white", shadow: true }} />
    </>
  );
});

export default AdminPage;
