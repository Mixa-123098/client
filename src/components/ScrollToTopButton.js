import React, { useState, useEffect } from "react";
import ScrollToTop from "../custom-hooks/ScrollToTop";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  // Only the >= 0.75 threshold matters, so store the boolean: the component
  // then re-renders only when the button's visibility actually flips, not on
  // every scroll event. rAF-throttled + passive; listener attached once.
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowButton(window.pageYOffset / 500 >= 0.75);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (showButton) {
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
