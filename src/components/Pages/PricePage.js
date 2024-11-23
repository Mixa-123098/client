import React from "react";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import ScrollToTop from "../../custom-hooks/ScrollToTop";
import "../../App.css";
import { useTranslation } from "react-i18next";

const PriceCard = ({ title, text, price }) => {
  const { t } = useTranslation();

  return (
    <div className=" col-lg-7 col-md-9 col-sm-12 mt-3">
      <div className="card">
        <div className="d-flex">
          <div className="card-body col-lg-6 col-7">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <p className="card-text">{price}</p>
          </div>
          <div className="d-flex align-items-center col-3 me-2">
            <div>
              <Link
                className="btn btn-dark price-button"
                to={"/contacts"}
                onClick={ScrollToTop}
              >
                {t("pricesPage.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header fontColor="#000000" invert="invert(0%)" rep={true} />
      <PagesHeader title={t("pricesPage.ourPrices")} />
      <div className="container mt-5 mb-5 ">
        <div className="row justify-content-center ">
          <PriceCard
            title={t("pricesPage.tariff1.size")}
            price={t("pricesPage.tariff1.price")}
          />
          <PriceCard
            title={t("pricesPage.tariff2.size")}
            price={t("pricesPage.tariff2.price")}
          />
          <PriceCard
            title={t("pricesPage.tariff3.size")}
            price={t("pricesPage.tariff3.price")}
          />
          <PriceCard
            title={t("pricesPage.tariff4.size")}
            price={t("pricesPage.tariff4.price")}
          />
          <div className="d-flex justify-content-center mt-5">
            {t("pricesPage.additionalInfo")}
          </div>
        </div>
      </div>
      <Footer settings={{ color: "black", bgColor: "white", shadow: true }} />
    </>
  );
};

export default PricePage;
