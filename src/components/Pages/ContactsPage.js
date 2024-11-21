import React from "react";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";

const ContactsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header fontColor={`#000000`} invert={`invert(0%)`} rep={true} />
      <PagesHeader title={t("contactsPage.contacts")} />
      <div className="container my-5" style={{ minHeight: "25vh" }}>
        <div className="row">
          <div className="col-md-8 col-sm-12 mx-auto">
            <div className="card">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    {t("contactsPage.telegram")}:{" "}
                    <a className="text-dark   " href="https://t.me/example">
                      @example
                    </a>
                  </li>
                  <li>
                    {t("contactsPage.instagram")}:{" "}
                    <a
                      className="text-dark  "
                      href="https://www.instagram.com/example/"
                    >
                      @example
                    </a>
                  </li>
                  <li>
                    {t("contactsPage.viber")}:{" "}
                    <a
                      className="text-dark "
                      href="viber://chat?number=+1234567890"
                    >
                      +123 456 7890
                    </a>
                  </li>
                </ul>
                <hr />
                <ul className="list-unstyled">
                  <li>
                    {t("contactsPage.email")}:{" "}
                    <a
                      className="text-dark  "
                      href="mailto:example@example.com"
                    >
                      example@example.com
                    </a>
                  </li>
                  <li>
                    {t("contactsPage.telephone")}:{" "}
                    <a className="text-dark    " href="tel:+1234567890">
                      +123 456 7890
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
