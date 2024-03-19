import React from "react";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";

const ContactsPage = () => {
  return (
    <>
      <Header fontColor={`#000000`} invert={`invert(0%)`} rep={true}/>
      <PagesHeader title="Контакти" />
      <div className="container my-5" style={{minHeight:"25vh"}}>
        <div className="row">
          <div className="col-md-8 col-sm-12 mx-auto">
            <div className="card">
              <div className="card-body">
                <ul className="list-unstyled">
                  <li>
                    Телеграм:{" "}
                    <a className="text-dark   " href="https://t.me/example">
                      @example
                    </a>
                  </li>
                  <li>
                    Інстаграм:{" "}
                    <a
                      className="text-dark  "
                      href="https://www.instagram.com/example/"
                    >
                      @example
                    </a>
                  </li>
                  <li>
                    Вайбер:{" "}
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
                    Email:{" "}
                    <a
                      className="text-dark  "
                      href="mailto:example@example.com"
                    >
                      example@example.com
                    </a>
                  </li>
                  <li>
                    Телефон:{" "}
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
