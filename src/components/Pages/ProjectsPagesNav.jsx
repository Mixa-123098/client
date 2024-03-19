import React from "react";
import "./ProjectsPage.css";

const ProjectsPagesNav = ({ setFocusedPage, totalPages, currentPage }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((page) => page + 1);
  if(totalPages>1){
    return (
      <div className="container d-flex justify-content-center projects-pages-nav">
        {pageNumbers.map((page) => (
          <span
            key={page}
            onClick={() => setFocusedPage(page)}
            className={page === currentPage ? "active-page" : ""}
          >
            {page}
          </span>
        ))}
      </div>
    );
  }
  
};

export default ProjectsPagesNav;
