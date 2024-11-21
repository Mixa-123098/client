import React from "react";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import ScrollToTop from "../../custom-hooks/ScrollToTop";
import "../../App.css"

const PriceCard = ({ title, text, price }) => {
  return (
    <div className=" col-lg-7 col-md-9 col-sm-12 mt-3">
      <div className="card">
        <div className="d-flex">
          <div className="card-body col-lg-6 col-7">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <p className="card-text">Ціна: {price}</p>
          </div>
          <div className="d-flex align-items-center col-3 me-2">
            <div>
              <Link
                className="btn btn-dark price-button"
                to={"/contacts"}
                onClick={ScrollToTop}
              >
                Зв'язатися з нами
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PricePage = () => {
  // const replaceStore = replaceColorStore();
  // replaceStore.isReplace(true)
  return (
    <>
      <Header fontColor="#000000" invert="invert(0%)" rep={true} />
      <PagesHeader title="Наші ціни" />
      <div className="container mt-5 mb-5 ">
        <div className="row justify-content-center ">
          <PriceCard
            title="Приміщення до 40м2"
            // text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            price="$30/м2"
          />
          <PriceCard
            title="Приміщення 40-100м2"
            // text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            price="$25/м2"
          />
          <PriceCard
            title="Приміщення від 100м2*"
            // text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            price="$20/м2"
          />
          <PriceCard
            title="Авторський супровід "
            // text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            price="$250/місяць"
          />
          <div className="d-flex justify-content-center mt-5">
            *Ціна за проекти, що мають великі площі обговорюється індивідуально
          </div>
        </div>
      </div>
      <Footer settings={{ color: "black", bgColor: "white", shadow: true }} />
    </>
  );
};

export default PricePage;
