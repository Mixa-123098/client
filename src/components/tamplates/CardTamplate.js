import React from "react";

const CardTemplate = ({
  title,
  subtitle,
  card_content,
  img_src,
  isList,
  height,
  border,
}) => {
  const splited_content =
    card_content &&
    card_content
      .split(";")
      .map((sentence, index) => <li key={index}>{sentence.trim()}</li>);

  const cardStyle = {
    height: height,
    border: border ? "1px solid #ddd" : "none",
  };

  return (
    <div className="card" style={cardStyle}>
      {img_src && (
        <img
          src={`${img_src}`}
          alt="img"
          className="card-img-top"
          style={{
            width: "100%",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "5px",
          }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
        {isList === true ? (
          <ul className="card-text">{splited_content} </ul>
        ) : (
          <p className="card-text">{card_content} </p>
        )}
      </div>
    </div>
  );
};

export default CardTemplate;
