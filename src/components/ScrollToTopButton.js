import React, { useState, useEffect } from "react";
import ScrollToTop from "../custom-hooks/ScrollToTop";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [scroll, setScroll] = useState(0);
  // let opacity;
  useEffect(() => {
    const handleScroll = (event) => {
      setScroll(window.pageYOffset / 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);
  if (scroll >= 0.75) {
    return (
      <div className="container-fluid">
        <button
          className="btn btn-danger button-style"
          onClick={() => ScrollToTop()}
        >
          &#9650;
        </button>
      </div>
    );
  }
};
// const ScrollToTopButton = () => {
//   return (
//     <div className="d-flex  justify-content-end w-100">
//       <button
//         className="btn btn-dark position-fixed fixed-bottom col-2 ml-auto"
//         onClick={() => ScrollToTop()}
//       >
//         Догори
//       </button>
//     </div>
//   );
// };

export default ScrollToTopButton;
