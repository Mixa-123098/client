import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import ProjectEditor from "./ProjectEditor";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n.js";
import { API_URL } from "../../config/api";
import authStore from "../../store/authStore";
import languagesStore from "../../store/languagesStore";

const ProjectsEdit = observer(() => {
  const { t } = useTranslation();
  const canDelete = authStore.user?.role === "admin";

  useEffect(() => {
    languagesStore.fetchLanguages();
  }, []);

  const [projects, setProjects] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retranslatingId, setRetranslatingId] = useState(null);
  const [retranslateResult, setRetranslateResult] = useState(null); // { id, ok } | null
  const [orderDirty, setOrderDirty] = useState(false);
  const [orderStatus, setOrderStatus] = useState("idle"); // idle | saving | success | error
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [retranslateSelection, setRetranslateSelection] = useState({}); // { [projectId]: Set<lang> }

  useEffect(() => {
    setLoading(true);

    const fetchProjects = fetch(`${API_URL}/projects`, {
      credentials: "include",
    }).then((response) => response.json());
    const fetchTranslations = fetch(`${API_URL}/project_translations`, {
      credentials: "include",
    }).then((response) => response.json());

    Promise.all([fetchProjects, fetchTranslations])
      .then(([projectsData, translationsData]) => {
        setProjects(projectsData);
        setTranslations(translationsData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // The list shows each project's name/city/country in whatever language is
  // currently selected on the site, not always the project's own source
  // language — falls back to the source text when there's no translation
  // for the current language, so a project never disappears from the admin's
  // own list (unlike the public site, which hides untranslated projects).
  const getDisplayFields = (project) => {
    if (project.source_lang === i18n.language) {
      return {
        name: project.project_name,
        city: project.project_city,
        country: project.project_country,
      };
    }
    const row = translations.find(
      (t) => t.project_id === project.id && t.lang === i18n.language
    );
    return row
      ? { name: row.name, city: row.city, country: row.country }
      : {
          name: project.project_name,
          city: project.project_city,
          country: project.project_country,
        };
  };

  const toggleRetranslateLang = (projectId, lang) => {
    setRetranslateSelection((prev) => {
      const current = new Set(prev[projectId] || []);
      if (current.has(lang)) {
        current.delete(lang);
      } else {
        current.add(lang);
      }
      return { ...prev, [projectId]: current };
    });
  };

  const handleRetranslateClick = async (projectId, projectName) => {
    const selectedLangs = Array.from(retranslateSelection[projectId] || []);
    if (selectedLangs.length === 0) return;

    if (
      !window.confirm(
        `${t("editPage.editProject.retranslateConfirm")} "${projectName.trim()}" (${selectedLangs
          .map((l) => l.toUpperCase())
          .join(", ")})?`
      )
    )
      return;

    setRetranslatingId(projectId);
    setRetranslateResult(null);
    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/retranslate`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ langs: selectedLangs }),
      });
      setRetranslateResult({ id: projectId, ok: response.ok });
      if (response.ok) {
        setRetranslateSelection((prev) => ({ ...prev, [projectId]: new Set() }));
      }
    } catch (error) {
      console.error("Error retranslating project:", error);
      setRetranslateResult({ id: projectId, ok: false });
    } finally {
      setRetranslatingId(null);
    }
  };

  const handleProjectSaved = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleDeleteClick = async (projectId, project_name) => {
    const name = project_name.trimEnd();
    const isConfirmed = window.confirm(
      `${t("editPage.editProject.deleMassage")} "${name}?"`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${API_URL}/delete_project/${projectId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== projectId)
          );
        } else {
          const result = await response.json();
          console.error("Failed to delete project:", result);
        }
      } catch (error) {
        console.error("Error sending delete request:", error);
      }
    }
  };

  const handleToggleVisibility = async (project) => {
    const nextHidden = !project.is_hidden;
    try {
      const response = await fetch(
        `${API_URL}/projects/${project.id}/visibility`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_hidden: nextHidden }),
        }
      );
      if (!response.ok) throw new Error("visibility_update_failed");
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === project.id ? { ...p, is_hidden: nextHidden } : p
        )
      );
    } catch (error) {
      console.error("Error toggling project visibility:", error);
      alert(t("editPage.editProject.visibilityError"));
    }
  };

  const handleRowDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleRowDragOver = (e) => {
    e.preventDefault();
  };

  const handleRowDrop = (e, newIndex) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
    if (draggedIndex === newIndex) return;
    setProjects((prevProjects) => {
      const reordered = [...prevProjects];
      const [draggedProject] = reordered.splice(draggedIndex, 1);
      reordered.splice(newIndex, 0, draggedProject);
      return reordered;
    });
    setOrderDirty(true);
    setOrderStatus("idle");
  };

  const handleSaveOrder = async () => {
    setOrderStatus("saving");
    try {
      const response = await fetch(`${API_URL}/projects_order`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: projects.map((project, index) => ({
            id: project.id,
            order: index,
          })),
        }),
      });
      if (!response.ok) throw new Error("order_save_failed");
      setOrderStatus("success");
      setOrderDirty(false);
    } catch (error) {
      console.error("Error saving project order:", error);
      setOrderStatus("error");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container mt-4 mb-4">
        <h1>{t("editPage.editProject.editProject")}</h1>

        <p className="text-muted small">
          {t("editPage.editProject.reorderHint")}
        </p>
        {orderDirty && (
          <div className="d-flex align-items-center gap-2 mb-2">
            <button
              className="btn btn-dark btn-sm d-flex align-items-center gap-2"
              onClick={handleSaveOrder}
              disabled={orderStatus === "saving"}
            >
              {orderStatus === "saving" && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {t("editPage.editProject.saveOrder")}
            </button>
            {orderStatus === "error" && (
              <span className="text-danger small">
                {t("editPage.editProject.saveOrderError")}
              </span>
            )}
          </div>
        )}
        {orderStatus === "success" && !orderDirty && (
          <div className="alert alert-success py-1 small" role="alert">
            {t("editPage.editProject.saveOrderSuccess")}
          </div>
        )}

        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t("editPage.editProject.projectName")}</th>
              <th scope="col">{t("editPage.editProject.city")}</th>
              <th scope="col">{t("editPage.editProject.country")}</th>
              <th scope="col">{t("editPage.editProject.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              const display = getDisplayFields(project);
              return (
              <React.Fragment key={project.id}>
              <tr
                draggable={!editingProjectId}
                onDragStart={(e) => handleRowDragStart(e, index)}
                onDragOver={handleRowDragOver}
                onDrop={(e) => handleRowDrop(e, index)}
                style={{ cursor: editingProjectId ? "default" : "grab" }}
              >
                <td>
                  {display.name}{" "}
                  {project.is_hidden && (
                    <span className="badge text-bg-secondary">
                      {t("editPage.editProject.hidden")}
                    </span>
                  )}
                </td>
                <td>{display.city}</td>
                <td>{display.country}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() =>
                      setEditingProjectId((prev) =>
                        prev === project.id ? null : project.id
                      )
                    }
                  >
                    {editingProjectId === project.id
                      ? t("editPage.editProject.closeEditor")
                      : t("editPage.editProject.edit")}
                  </button>
                  <button
                    className="btn btn-outline-dark ms-3"
                    onClick={() => handleToggleVisibility(project)}
                  >
                    {project.is_hidden
                      ? t("editPage.editProject.show")
                      : t("editPage.editProject.hide")}
                  </button>
                  <div className="dropdown d-inline-block ms-3">
                    <button
                      type="button"
                      className="btn btn-outline-dark dropdown-toggle"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                      disabled={retranslatingId === project.id}
                    >
                      {retranslatingId === project.id && (
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      {t("editPage.editProject.retranslate")}
                    </button>
                    <div className="dropdown-menu p-3" style={{ minWidth: 220 }}>
                      <div className="small text-muted mb-2">
                        {t("editPage.editProject.retranslateChooseLangs")}
                      </div>
                      {languagesStore.languages
                        .filter((lang) => lang.code !== project.source_lang)
                        .map((lang) => (
                          <div className="form-check" key={lang.code}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`retranslate-${project.id}-${lang.code}`}
                              checked={
                                retranslateSelection[project.id]?.has(
                                  lang.code
                                ) || false
                              }
                              onChange={() =>
                                toggleRetranslateLang(project.id, lang.code)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`retranslate-${project.id}-${lang.code}`}
                            >
                              {lang.code.toUpperCase()} — {lang.name}
                            </label>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-dark btn-sm mt-2 w-100"
                        disabled={
                          !retranslateSelection[project.id]?.size ||
                          retranslatingId === project.id
                        }
                        onClick={() =>
                          handleRetranslateClick(
                            project.id,
                            project.project_name
                          )
                        }
                      >
                        {t("editPage.editProject.retranslateSubmit")}
                      </button>
                    </div>
                  </div>
                  {canDelete && (
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() =>
                        handleDeleteClick(project.id, project.project_name)
                      }
                    >
                      {t("editPage.editProject.delete")}
                    </button>
                  )}
                  {retranslateResult && retranslateResult.id === project.id && (
                    <div
                      className={`small mt-1 ${
                        retranslateResult.ok ? "text-success" : "text-danger"
                      }`}
                    >
                      {retranslateResult.ok
                        ? t("editPage.editProject.retranslateSuccess")
                        : t("editPage.editProject.retranslateError")}
                    </div>
                  )}
                </td>
              </tr>
              {editingProjectId === project.id && (
                <tr>
                  <td colSpan={4}>
                    <ProjectEditor
                      project={project}
                      onSaved={handleProjectSaved}
                      onClose={() => setEditingProjectId(null)}
                    />
                  </td>
                </tr>
              )}
              </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default ProjectsEdit;
