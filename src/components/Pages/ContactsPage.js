import React, { useState } from "react";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import Seo from "../Seo";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../config/api";

const InquiryForm = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    message: "",
    website: "", // honeypot — hidden from real users
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.contact.trim() && !form.message.trim()) return;
    setStatus("submitting");
    try {
      const response = await fetch(`${API_URL}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("success");
      setForm({ name: "", contact: "", message: "", website: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatus("error");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-1">{t("contactsPage.form.title")}</h5>
        <p className="text-muted small mb-3">{t("contactsPage.form.hint")}</p>

        {status === "success" ? (
          <div className="alert alert-success mb-0" role="alert">
            {t("contactsPage.form.success")}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={t("contactsPage.form.name")}
                value={form.name}
                onChange={handleChange}
                disabled={status === "submitting"}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="contact"
                className="form-control"
                placeholder={t("contactsPage.form.contact")}
                value={form.contact}
                onChange={handleChange}
                disabled={status === "submitting"}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                name="message"
                className="form-control"
                rows="3"
                placeholder={t("contactsPage.form.message")}
                value={form.message}
                onChange={handleChange}
                disabled={status === "submitting"}
              />
            </div>
            {/* Honeypot: visually hidden, off-screen, not tab-reachable. */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />
            {status === "error" && (
              <div className="alert alert-danger py-2" role="alert">
                {t("contactsPage.form.error")}
              </div>
            )}
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
              {status === "submitting"
                ? t("contactsPage.form.submitting")
                : t("contactsPage.form.submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ContactsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Contacts"
        description="Get in touch with ODA, an interior design and architecture studio working in Dnipro and Kyiv, Ukraine."
      />
      <Header fontColor={`#000000`} invert={`invert(0%)`} rep={true} />
      <PagesHeader title={t("contactsPage.contacts")} />
      <div className="container my-5" style={{ minHeight: "25vh" }}>
        <div className="row">
          <div className="col-md-8 col-sm-12 mx-auto">
            <InquiryForm />

            <div className="card">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    {t("contactsPage.telegram")}:{" "}
                    <a
                      className="text-dark"
                      href="https://t.me/marynaprokhorova_design"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @marynaprokhorova_design
                    </a>
                  </li>
                  <li>
                    {t("contactsPage.viber")}:{" "}
                    <a
                      className="text-dark"
                      href="viber://chat?number=%2B380676397018"
                    >
                      +380 67 639 70 18
                    </a>
                  </li>
                  <li>
                    WhatsApp:{" "}
                    <a
                      className="text-dark"
                      href="https://wa.me/380676397018"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +380 67 639 70 18
                    </a>
                  </li>
                  <li>
                    {t("contactsPage.instagram")}:{" "}
                    <a
                      className="text-dark"
                      href="https://www.instagram.com/oda_archetecture/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @oda_archetecture
                    </a>
                  </li>
                </ul>
                <hr />
                <ul className="list-unstyled">
                  <li>
                    {t("contactsPage.email")}:{" "}
                    <a
                      className="text-dark"
                      href="mailto:marynaprokhorova@gmail.com"
                    >
                      marynaprokhorova@gmail.com
                    </a>
                  </li>
                  <li>
                    {t("contactsPage.telephone")}:{" "}
                    <a className="text-dark" href="tel:+380676397018">
                      +380 67 639 70 18
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer settings={{ color: `black`, bgColor: `white`, shadow: true }} />
    </>
  );
};

export default ContactsPage;
