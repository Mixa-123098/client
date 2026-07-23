import React, { useState } from "react";
import useFileUpload from "../../custom-hooks/useFileUpload";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const emptyProjectData = {
  project_name: "",
  project_city: "",
  project_country: "",
  project_specialization: " ",
  project_img_src: "",
  project_header_img: "",
  project_brief: "",
  project_finish_date: "",
  project_square: "",
  project_team: "",
  blueprint_img: "",
  blueprint_description: "",
  imges_list: [],
};

const Field = ({ label, required, children }) => (
  <div className="mb-3">
    <label className="form-label mb-1">
      {label}
      {required && <span className="text-danger"> *</span>}
    </label>
    {children}
  </div>
);

const FilePreview = ({ src }) =>
  src ? (
    <img
      src={src}
      alt=""
      className="mt-2 rounded border"
      style={{ height: 70, width: 70, objectFit: "cover" }}
    />
  ) : null;

const CreateProject = () => {
  const { t } = useTranslation();

  const [projectData, setProjectData] = useState(emptyProjectData);
  const [previews, setPreviews] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [failedTranslations, setFailedTranslations] = useState([]);
  const tipoProjectId = Date.now();
  const { handleFileChange, handleUpload, resetFiles } = useFileUpload(
    setProjectData,
    projectData,
    tipoProjectId
  );

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviews((prev) => ({
        ...prev,
        [name]: files.length === 1 ? urls[0] : urls,
      }));
    }
    handleFileChange(e);
  };

  const resetForm = () => {
    setProjectData(emptyProjectData);
    setPreviews({});
    resetFiles();
  };

  const isSpecializationInvalid =
    !projectData.project_specialization ||
    projectData.project_specialization === " ";

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSpecializationInvalid) {
      alert(t("editPage.createNewProject.feedbacks.chooseSpecialization"));
      return;
    }

    setStatus("submitting");
    setFailedTranslations([]);
    try {
      const response = await fetch(`${API_URL}/create_post`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      await handleUpload(`${API_URL}/upload`);

      setStatus("success");
      setFailedTranslations(data.failed_translations || []);
      resetForm();
    } catch (error) {
      console.error("Error creating project:", error);
      setStatus("error");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 640 }}>
      <h2>{t("editPage.createNewProject.create")}</h2>
      <p className="text-muted small">
        <span className="text-danger">*</span>{" "}
        {t("editPage.createNewProject.requiredHint")}
      </p>

      <form onSubmit={handleFormSubmit} className="mt-4">
        {status === "success" && (
          <div className="alert alert-success" role="alert">
            {t("editPage.createNewProject.success")}
          </div>
        )}
        {status === "success" && failedTranslations.length > 0 && (
          <div className="alert alert-warning" role="alert">
            {t("editPage.createNewProject.translationFailed")}{" "}
            {failedTranslations.join(", ").toUpperCase()}.{" "}
            {t("editPage.createNewProject.translationFailedHint")}
          </div>
        )}
        {status === "error" && (
          <div className="alert alert-danger" role="alert">
            {t("editPage.createNewProject.error")}
          </div>
        )}

        <fieldset disabled={status === "submitting"}>
          <Field label={t("editPage.createNewProject.name")} required>
            <input
              type="text"
              className="form-control"
              name="project_name"
              value={projectData.project_name}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field
            label={t("editPage.createNewProject.specialization.title")}
            required
          >
            <select
              name="project_specialization"
              className="form-select"
              value={projectData.project_specialization}
              onChange={handleInputChange}
              required
            >
              <option value=" ">
                {t("editPage.createNewProject.specialization.choose")}
              </option>
              <option value="1">
                {t("editPage.createNewProject.specialization.publicInteriors")}
              </option>
              <option value="2">
                {t("editPage.createNewProject.specialization.apartments")}
              </option>
              <option value="3">
                {t("editPage.createNewProject.specialization.privateHouses")}
              </option>
            </select>
          </Field>

          <Field label={t("editPage.createNewProject.previewImage")} required>
            <input
              type="file"
              className="form-control"
              name="project_img_src"
              onChange={handleFileInputChange}
              required
            />
            <FilePreview src={previews.project_img_src} />
          </Field>

          <div className="row">
            <div className="col-6">
              <Field label={t("editPage.createNewProject.city")}>
                <input
                  type="text"
                  name="project_city"
                  className="form-control"
                  value={projectData.project_city}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
            <div className="col-6">
              <Field label={t("editPage.createNewProject.country")}>
                <input
                  type="text"
                  name="project_country"
                  className="form-control"
                  value={projectData.project_country}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
          </div>

          <Field label={t("editPage.createNewProject.topProjectImage")}>
            <input
              type="file"
              className="form-control"
              name="project_header_img"
              onChange={handleFileInputChange}
            />
            <FilePreview src={previews.project_header_img} />
          </Field>

          <Field label={t("editPage.createNewProject.projectDescription")}>
            <input
              type="text"
              name="project_brief"
              className="form-control"
              value={projectData.project_brief}
              onChange={handleInputChange}
            />
          </Field>

          <div className="row">
            <div className="col-6">
              <Field label={t("editPage.createNewProject.endDate")}>
                <input
                  type="text"
                  name="project_finish_date"
                  className="form-control"
                  value={projectData.project_finish_date}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
            <div className="col-6">
              <Field label={t("editPage.createNewProject.square")}>
                <input
                  type="text"
                  name="project_square"
                  className="form-control"
                  value={projectData.project_square}
                  onChange={handleInputChange}
                />
              </Field>
            </div>
          </div>

          <Field label={t("editPage.createNewProject.team")}>
            <input
              type="text"
              name="project_team"
              className="form-control"
              value={projectData.project_team}
              onChange={handleInputChange}
            />
          </Field>

          <Field label={t("editPage.createNewProject.blueprintImage")}>
            <input
              type="file"
              className="form-control"
              name="blueprint_img"
              onChange={handleFileInputChange}
            />
            <FilePreview src={previews.blueprint_img} />
          </Field>

          <Field label={t("editPage.createNewProject.blueprintDescription")}>
            <input
              type="text"
              name="blueprint_description"
              className="form-control"
              value={projectData.blueprint_description}
              onChange={handleInputChange}
            />
          </Field>

          <Field label={t("editPage.createNewProject.imagesInsideTheProject")}>
            <input
              type="file"
              className="form-control"
              name="imges_list"
              onChange={handleFileInputChange}
              multiple
            />
            {Array.isArray(previews.imges_list) &&
              previews.imges_list.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {previews.imges_list.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="rounded border"
                      style={{ height: 70, width: 70, objectFit: "cover" }}
                    />
                  ))}
                </div>
              )}
          </Field>

          <button
            type="submit"
            className="btn btn-dark mt-3 mb-5 d-flex align-items-center justify-content-center gap-2"
            style={{ minWidth: 180 }}
          >
            {status === "submitting" && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {status === "submitting"
              ? t("editPage.createNewProject.submitting")
              : t("editPage.createNewProject.create")}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProject;
