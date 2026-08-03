import React, { useEffect, useState } from "react";
import { API_URL } from "../../config/api";
import { useTranslation } from "react-i18next";

const InquiriesManager = () => {
  const { t } = useTranslation();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(`${API_URL}/inquiries`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setInquiries(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching inquiries:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const toggleRead = async (id, isRead) => {
    try {
      await fetch(`${API_URL}/inquiries/${id}/read`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !isRead }),
      });
      load();
    } catch (error) {
      console.error("Error updating inquiry:", error);
    }
  };

  const remove = async (id) => {
    if (!window.confirm(t("editPage.inquiries.deleteConfirm"))) return;
    try {
      await fetch(`${API_URL}/inquiries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      load();
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  if (loading) {
    return <p>{t("editPage.cropImages.loading")}</p>;
  }

  return (
    <div className="container">
      <h2 className="mb-4">{t("editPage.inquiries.title")}</h2>

      {inquiries.length === 0 ? (
        <p className="text-muted">{t("editPage.inquiries.empty")}</p>
      ) : (
        inquiries.map((q) => (
          <div
            key={q.id}
            className={`card mb-2${q.is_read ? "" : " border-dark border-2"}`}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between flex-wrap gap-2">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <strong>{q.name || "—"}</strong>
                    {!q.is_read && (
                      <span className="badge text-bg-dark">
                        {t("editPage.inquiries.new")}
                      </span>
                    )}
                  </div>
                  <div>{q.contact || "—"}</div>
                  <div className="text-muted small">
                    {new Date(q.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="d-flex gap-2 align-items-start">
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => toggleRead(q.id, q.is_read)}
                  >
                    {q.is_read
                      ? t("editPage.inquiries.markUnread")
                      : t("editPage.inquiries.markRead")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => remove(q.id)}
                  >
                    {t("editPage.inquiries.delete")}
                  </button>
                </div>
              </div>
              {q.message && <p className="mt-2 mb-0">{q.message}</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default InquiriesManager;
