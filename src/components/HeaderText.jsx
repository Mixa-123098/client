import React, { Component } from "react";

class HeaderText extends Component {
  render() {
    const titlePage = [
      "Квартира в ЖК «Лофт»",
      "Будинок на схилах Дніпра",
      "Караоке-бар у стилі Steampunk",
    ];
    // const subtitlePage = ["подзаголовок 1", "подзаголовок 2", "подзаголовок 3"];
    const subtitlePage = [
      {
        link: "https://client-1-lolb.onrender.com/projects/6",
      },
      {
        link: "https://client-1-lolb.onrender.com/projects/7",
      },
      {
        link: "https://client-1-lolb.onrender.com/projects/8",
      },
    ];
    return (
      <>
        <div className="header-text d-flex ">
          <div className="countPage">
            0{this.props.count}/<span className="bigger-text">03</span>
          </div>

          <div className="textPage">
            <div className="titlePage">{titlePage[this.props.count - 1]}</div>
            <div className="subtitlePage">
              <a
                href={subtitlePage[this.props.count - 1].link}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-light"
              >
                Перейти до проєкту
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default HeaderText;
