import React, { useEffect } from "react";
import HeaderText from "./HeaderText";
import instagram_logo from "../assets/Instagram_logo.png";
import facebook_logo from "../assets/pngwing.com.png";
import { useState } from "react";

function BottomHeader() {
  const [count, setCount] = useState(1);

  function handleClick(setCount, index) {
    setCount(index);
    document.querySelector(".video.active").classList.remove("active");
    document.querySelectorAll(".video")[index - 1].classList.add("active");
    document.querySelectorAll(".video").forEach((video) => {
      video.style.display = "none";
    });
    document.querySelectorAll(".video")[index - 1].style.display = "block";
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount >= 3 ? 1 : prevCount + 1;
        blockAnimate(newCount);
        return newCount;
      });
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  function blockAnimate(count) {
    let videos = document.querySelectorAll(".video");

    switch (count) {
      case 1:
        videos[0].style.display = "block";
        videos[2].style.display = "none";
        break;
      case 2:
        videos[0].style.display = "none";
        videos[1].style.display = "block";
        break;
      case 3:
        videos[1].style.display = "none";
        videos[2].style.display = "block";
        break;
      default:
      // do nothing
    }
  }

  function BottomHeaderIcons() {
    return (
      <>
        <div className="bottomHeader-left">
          <a
            href="https://instagram.com/oda_archetecture?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr"
            className="nav_icons_width mix-blend-mode "
          >
            <img src={instagram_logo} alt="instagram" />
          </a>
          <a href="/" className="nav_icons_width mix-blend-mode ">
            <img src={facebook_logo} alt="facebook" />
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderText count={count} />

      <div className="bottomHeader d-flex align-items-center justify-content-between">
        <BottomHeaderIcons />
        <div className="bottomHeader-right d-flex">
          <span className="block_elem" onClick={() => handleClick(setCount, 1)}>
            1
          </span>
          <span className="block_elem" onClick={() => handleClick(setCount, 2)}>
            2
          </span>
          <span className="block_elem" onClick={() => handleClick(setCount, 3)}>
            3
          </span>
        </div>
      </div>
    </>
  );
}

export default BottomHeader;
