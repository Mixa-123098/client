import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ProjectsPage } from "./components/Pages/ProjectsPage";
import AboutPage from "./components/Pages/AboutPage";

import FirstBlok from "./components/Bloks/FirstBlok";
import SecondBlock from "./components/Bloks/SecondBlock";
// import ThirdBlock from "./components/Bloks/ThirdBlock";

// import bgvideo from "./assets/IMG_7070.MP4";
// import bgvideo from "./assets/bgvideo.mp4";
import bgvideo2 from "./assets/msedge_XyC2T8qYAq.png";
// import bgvideo2 from "./assets/bgvideo2.mp4";
import bgvideo3 from "./assets/photo_2023-11-03_12-03-29.jpg";
// import bgvideo3 from "./assets/bgvideo3.mp4";
import cheh from "./assets/cheh.mov"

import Header from "./components/Header";
import BottomHeader from "./components/BottomHeader";
import ProjectArticle from "./components/Pages/Projects/ProjectArticle";
import RegistrationForm from "./reg/auth/RegistrationForm";
import Footer from "./components/Footer";
import AdminPage from "./components/admin-pannel/AdminPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ForthBlock from "./components/Bloks/ForthBlock";
import FifthBlock from "./components/Bloks/FifthBlock";
import SixBlock from "./components/Bloks/SixBlock";
import ContactsPage from "./components/Pages/ContactsPage";
import PricePage from "./components/Pages/PricePage";
import NotFoundPage from "./components/Pages/NotFoundPage";

const MainPageContainer = ({ updateIndexFromSecBlock }) => {
  return (
    <div>
      {/* <Header /> */}
      <div className="main">
        <div className="overlay"></div>

        <img src={bgvideo2} alt="" className="img video active " />
        <video src={cheh} autoPlay loop muted className="video a" />
        <img src={bgvideo3} alt="" className="img video a" />

        <div className="header-content">
          <BottomHeader />
        </div>
      </div>

      <FirstBlok />
      <SecondBlock updateIndexFromSecBlock={updateIndexFromSecBlock} />
      <SixBlock />
      {/* <ThirdBlock /> */}
      <ForthBlock />
      <FifthBlock />
      <Footer />
    </div>
  );
};

function App() {
  const [indexFromSecBlock, setIndexFromSecBlock] = useState(0);
  const updateIndexFromSecBlock = (index) => {
    setIndexFromSecBlock(index + 1);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Routes>
        <Route
          path="/"
          element={
            <MainPageContainer
              updateIndexFromSecBlock={updateIndexFromSecBlock}
            />
          }
        />
        <Route path="/edit" element={<AdminPage />} />
        <Route path="/login" element={<RegistrationForm />} />
        <Route
          path="/projects"
          element={<ProjectsPage indexFromSecBlock={indexFromSecBlock} />}
        />
        <Route path="/projects/:id" element={<ProjectArticle />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ScrollToTopButton />
    </div>
  );
}

export { App };
