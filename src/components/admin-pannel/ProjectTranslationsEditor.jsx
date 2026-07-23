import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const FIELDS = [
  "name",
  "city",
  "country",
  "brief",
  "end_date",
  "team",
  "drawing_description",
];

const emptyFields = () =>
  FIELDS.reduce((acc, f) => ({ ...acc, [f]: "" }), {});

// Edits a project's text in any language with the same form regardless of
// whether that language is the project's own (source_lang, stored on
// projects/projects_blueprints) or a translation (project_translations) —
// the server hides that distinction behind one GET/PUT pair.
const ProjectTranslationsEditor = ({ projectId }) => {
  const { t } = useTranslation();
  const [sourceLang, setSourceLang] = useState(null);
  const [allTranslations, setAllTranslations] = useState(null);
  const [activeLang, setActiveLang] = useState(null);
  const [fields, setFields] = useState(emptyFields());
  const [loadStatus, setLoadStatus] = useState("loading"); // loading | idle | error
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | success | error

  useEffect(() => {
    setLoadStatus("loading");
    fetch(`${API_URL}/projects/${projectId}/translations`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("load_failed");
        return response.json();
      })
      .then((data) => {
        setSourceLang(data.source_lang);
        setAllTranslations(data.translations);
        setActiveLang(data.source_lang);
        setFields({ ...emptyFields(), ...(data.translations[data.source_lang] || {}) });
        setLoadStatus("idle");
      })
      .catch((error) => {
        console.error("Error loading project translations:", error);
        setLoadStatus("error");
      });
  }, [projectId]);

  const handleSelectLang = (lang) => {
    setActiveLang(lang);
    setSaveStatus("idle");
    setFields({ ...emptyFields(), ...(allTranslations[lang] || {}) });
  };

  const handleFieldChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch(
        `${API_URL}/projects/${projectId}/translations/${activeLang}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        }
      );
      if (!response.ok) throw new Error("save_failed");
      setAllTranslations((prev) => ({ ...prev, [activeLang]: fields }));
      setSaveStatus("success");
    } catch (error) {
      console.error("Error saving project translation:", error);
      setSaveStatus("error");
    }
  };

  if (loadStatus === "loading") {
    return <p>Завантаження...</p>;
  }
  if (loadStatus === "error") {
    return (
      <p className="text-danger">Не вдалося завантажити переклади</p>
    );
  }

  return (
    <div className="border rounded p-3 mt-2">
      <div className="d-flex flex-wrap gap-2 mb-3">
        {Object.keys(allTranslations).map((lang) => (
          <button
            key={lang}
            type="button"
            className={`btn btn-sm ${
              activeLang === lang ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => handleSelectLang(lang)}
          >
            {lang.toUpperCase()}
            {lang === sourceLang && " *"}
            {allTranslations[lang] === null && " (нема перекладу)"}
          </button>
        ))}
      </div>
      <p className="text-muted small">
        * — мова, якою проєкт створений напряму (не переклад)
      </p>

      {saveStatus === "success" && (
        <div className="alert alert-success py-1 small" role="alert">
          Збережено
        </div>
      )}
      {saveStatus === "error" && (
        <div className="alert alert-danger py-1 small" role="alert">
          Не вдалося зберегти
        </div>
      )}

      <div className="row g-2">
        <div className="col-6">
          <label className="form-label small">
            {t("editPage.createNewProject.name")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label small">
            {t("editPage.createNewProject.city")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.city}
            onChange={(e) => handleFieldChange("city", e.target.value)}
          />
        </div>
        <div className="col-3">
          <label className="form-label small">
            {t("editPage.createNewProject.country")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.country}
            onChange={(e) => handleFieldChange("country", e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label small">
            {t("editPage.createNewProject.projectDescription")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.brief}
            onChange={(e) => handleFieldChange("brief", e.target.value)}
          />
        </div>
        <div className="col-4">
          <label className="form-label small">
            {t("editPage.createNewProject.endDate")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.end_date}
            onChange={(e) => handleFieldChange("end_date", e.target.value)}
          />
        </div>
        <div className="col-8">
          <label className="form-label small">
            {t("editPage.createNewProject.team")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.team}
            onChange={(e) => handleFieldChange("team", e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label small">
            {t("editPage.createNewProject.blueprintDescription")}
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={fields.drawing_description}
            onChange={(e) =>
              handleFieldChange("drawing_description", e.target.value)
            }
          />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-dark btn-sm mt-3 d-flex align-items-center gap-2"
        onClick={handleSave}
        disabled={saveStatus === "saving"}
      >
        {saveStatus === "saving" && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        Зберегти переклад
      </button>
    </div>
  );
};

export default ProjectTranslationsEditor;
