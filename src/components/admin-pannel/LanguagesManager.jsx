import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import languagesStore from "../../store/languagesStore";

const LanguagesManager = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const loadLanguages = () => {
    setLoading(true);
    fetch(`${API_URL}/languages`)
      .then((response) => response.json())
      .then((data) => setLanguages(data))
      .catch((error) => console.error("Error fetching languages:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const handleAddLanguage = async (e) => {
    e.preventDefault();
    const trimmedCode = code.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!/^[a-z]{2,3}$/.test(trimmedCode)) {
      setStatus("error");
      setErrorMessage("Код мови має бути з 2-3 латинських літер, напр. \"pl\"");
      return;
    }
    if (!trimmedName) {
      setStatus("error");
      setErrorMessage("Вкажіть назву мови");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    try {
      const sourceResponse = await fetch("/locales/ua/translation.json");
      const sourceContent = await sourceResponse.json();

      const response = await fetch(`${API_URL}/languages`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmedCode, name: trimmedName, sourceContent }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "request_failed");
      }

      const data = await response.json();
      setStatus("success");
      setName("");
      setCode("");
      if (data.failed_project_ids && data.failed_project_ids.length > 0) {
        setErrorMessage(
          `Увага: ${data.projects_translated}/${data.projects_total} проєктів перекладено. ` +
            `Не вдалося перекласти проєкт(и) з ID: ${data.failed_project_ids.join(", ")} — ` +
            `спробуйте кнопку "Перекласти" на вкладці редагування проєкту.`
        );
      }
      loadLanguages();
      languagesStore.refresh();
    } catch (error) {
      console.error("Error adding language:", error);
      setStatus("error");
      setErrorMessage(
        error.message === "language_exists"
          ? "Ця мова вже додана"
          : "Не вдалося додати мову. Спробуйте ще раз."
      );
    }
  };

  const handleDelete = async (langCode) => {
    if (!window.confirm(`Видалити мову "${langCode}" разом з усіма її перекладами?`)) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/languages/${langCode}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("delete_failed");
      loadLanguages();
      languagesStore.refresh();
    } catch (error) {
      console.error("Error deleting language:", error);
      alert("Не вдалося видалити мову");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Мови сайту</h2>

      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Код</th>
              <th>Назва</th>
              <th>Тип</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr key={lang.code}>
                <td>{lang.code.toUpperCase()}</td>
                <td>{lang.name}</td>
                <td>{lang.is_builtin ? "Вбудована" : "Додана"}</td>
                <td>
                  {!lang.is_builtin && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(lang.code)}
                    >
                      Видалити
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4 className="mt-5">Додати нову мову</h4>
      <p className="text-muted small">
        Весь текст сайту та всі вже створені проєкти будуть автоматично
        перекладені через AI. Це може зайняти хвилину-дві.
      </p>

      {status === "success" && (
        <div className="alert alert-success" role="alert">
          Мову додано та перекладено!
        </div>
      )}
      {status === "success" && errorMessage && (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleAddLanguage} className="row g-2 align-items-center">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Назва (напр. Polish)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "submitting"}
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Код (напр. pl)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={status === "submitting"}
            style={{ maxWidth: 120 }}
          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-dark d-flex align-items-center gap-2"
            disabled={status === "submitting"}
          >
            {status === "submitting" && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {status === "submitting" ? "Перекладаємо..." : "Додати мову"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LanguagesManager;
