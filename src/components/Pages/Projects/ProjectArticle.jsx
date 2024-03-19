import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProjectArticle.css";
import Header from "../../Header";
import ScrollToTop from "../../../custom-hooks/ScrollToTop.jsx";
import Footer from "../../Footer";
const ProjectHeader = ({ dataList, parallaxOffset }) => {
  return (
    <>
      <div className="overlay"></div>

      <div className="paralax_img">
        <div className="header-paralax">
          <div className="header-text">
            <h1 className="titlePage">{dataList && dataList.project_name}</h1>
          </div>
        </div>

        <img
          src={`/img/main_imges_folder/${
            dataList && dataList.project_header_img
          }`}
          // src={`/img/projects_img/preview/${
          //   dataList && dataList.project_header_img
          // }`}
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          alt=""
        />
      </div>
    </>
  );
};

const ProjectArticleBrief = ({ dataList }) => {
  return (
    <>
      <div className="container d-flex justify-content-center brief-height set-column ">
        <div className="brif-styles   col-lg-6">
          <h3 className="">Опис проєкту</h3>
          <p className="w-100">{dataList && dataList.project_brief}</p>
        </div>

        <div className=" brif-info-styles col-lg-3  text-start">
          <div>
            <img src="" alt="" />
            <div className="">
              <b>Місцезнаходження:</b>
              <br /> {dataList && dataList.project_city}
              {", "}
              {dataList && dataList.project_country}
            </div>
          </div>
          <div>
            <img src="" alt="" />
            <div className="">
              <p>
                <b>Площа:</b>
                <br />
                {dataList && dataList.project_square}
                {"м"}
                <sup>2</sup>
              </p>
            </div>
          </div>
          <div>
            <img src="" alt="" />
            <div className="">
              <p>
                <b>Дата завершення:</b>
                <br /> {dataList && dataList.project_finish_date}
              </p>
            </div>
          </div>
          <div>
            <img src="" alt="" />
            <div className="">
              <b>Команда:</b>
              <br />
              {dataList && dataList.project_team}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProjectArticlePlanning = ({ id }) => {
  const [blueprints, setBlueprint] = useState();

  useEffect(() => {
    fetch(`https://server-2gn8.onrender.com/blueprints`)
      .then((response) => response.json())
      // eslint-disable-next-line eqeqeq
      .then((data) => setBlueprint(data.find((item) => item.project_id == id)));
  }, [id]);

  return (
    <>
      <div className="d-flex  container-lg  justify-content-around planning-adaptation">
        <div className="col-md-6 col-sm-8 d-flex  justify-content-center">
          <img
            src={`/img/main_imges_folder/${blueprints && blueprints.img}`}
            alt="planning"
            className="planning-img"
          />
        </div>

        <div className="col-md-6 col-sm-8 planning-text">
          <h3 className="text-center">Планування</h3>
          <div> {blueprints && blueprints.description}</div>
        </div>
      </div>
    </>
  );
};

const ProjectArticleImges = ({ id }) => {
  const [projectImges, setProjectImges] = useState([]);

  useEffect(() => {
    fetch(`https://server-2gn8.onrender.com/project_imges`)
      .then((response) => response.json())
      .then((data) =>
        setProjectImges(
          data
            // eslint-disable-next-line eqeqeq
            .filter((item) => item.project_id == id)
            .sort((a, b) => a.order - b.order)
        )
      );
  }, [id]);

  const imges =
    projectImges &&
    projectImges.map((element, index) => (
      <div key={index} className="col-lg-5 col-sm-6  p-lg-3 p-2 d-flex justify-content-center">
        <img
          src={`/img/main_imges_folder/${element.img}`}
          alt="planning"
          className="planning-img"
        />
      </div>
    ));
  return (
    <>
      <div className="d-flex justify-content-center container project_imges flex-wrap  ">
        {imges}
      </div>
    </>
  );
};
const PrevAndNextProject = ({ id }) => {
  const project_id = Number(id);
  const [dataList, setDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  console.log(dataList);
  useEffect(() => {
    fetch(`https://server-2gn8.onrender.com/projects`)
      .then((response) => response.json())
      .then((data) => {
        setDataList(data);
        const index = data.findIndex((item) => item.id === project_id);
        setCurrentIndex(index);
      });
  }, [project_id]);

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex =
    currentIndex < dataList.length - 1 ? currentIndex + 1 : null;

  return (
    <>
      <div className="prev-and-next-project d-flex justify-content-around">
        {prevIndex !== null && (
          <Link
            to={`/projects/${dataList[prevIndex].id}`}
            onClick={<ScrollToTop />}
            className="text-decoration-none text-light"
          >
            <h4>Попередній проєкт</h4>
          </Link>
        )}
        {nextIndex !== null && (
          <Link
            to={`/projects/${dataList[nextIndex].id}`}
            onClick={<ScrollToTop />}
            className="text-decoration-none text-light"
          >
            <h4>Наступний проєкт</h4>
          </Link>
        )}
      </div>
    </>
  );
};

// const PrevAndNextProject = ({ id }) => {
//   const project_id = Number(id);
//   const [dataList, setDataList] = useState();
//   console.log(dataList);

//   useEffect(() => {
//     fetch(`https://server-2gn8.onrender.com/projects`)
//       .then((response) => response.json())
//       .then((data) => setDataList(data));
//   }, [id]);

//   const order =
//     dataList && dataList.findIndex((item) => item.id === project_id);
//   console.log(
//     `Порядок элемента с project_id ${project_id} в массиве: ${order}`
//   );

//   console.log(order+1);
//   // console.log(dataList);
//   return (
//     <>
//       <div className="prev-and-next-project d-flex justify-content-around">
//         <Link
//           to={`/projects/${project_id - 1}`}
//           onClick={<ScrollToTop />}
//           className="text-decoration-none text-light"
//         >
//           <h4>Попередній проєкт</h4>
//         </Link>
//         <Link
//           to={`/projects/${project_id + 1}`}
//           onClick={<ScrollToTop />}
//           className="text-decoration-none text-light"
//         >
//           <h4>Наступний проєкт</h4>
//         </Link>
//       </div>
//     </>
//   );
// };
const ProjectArticle = () => {
  const { id } = useParams();

  const [dataList, setDataList] = useState();
  console.log(dataList);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    fetch(`https://server-2gn8.onrender.com/projects`)
      .then((response) => response.json())
      // .then((data) => setDataList(data[id - 6]));
      .then((data) =>
        setDataList(data.find((project) => project.id === parseInt(id)))
      );
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  const parallaxOffset = 1 * scrollY * 0.5;
  return (
    <>
      <Header />
      <ProjectHeader dataList={dataList} parallaxOffset={parallaxOffset} />
      <ProjectArticleBrief dataList={dataList} />
      <ProjectArticlePlanning id={id} />
      <ProjectArticleImges id={id} />

      <PrevAndNextProject id={id} />
      <Footer />
    </>
  );
};

export default ProjectArticle;
