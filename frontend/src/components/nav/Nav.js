import React, { useEffect, useState } from "react";
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import "./Nav.css";

const logo = "/static/images/tmdb.svg";

function Nav() {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;

      if (position > 50) {
        setHide(position > scrollPosition);
        setSrollPosition(position);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <nav className={`blue-bg ${hide && "hide-nav"}`}>
      <div className="navigationBar">
        <a href="/" className="nav-logo">
          <img src={logo} alt="logo" width="154" height="20" />
        </a>

        <div className="nav-list-container">
          <ul>
            <li>
              <a href="/">Movies</a>
            </li>

            <li>
              <a href="/">TV Shows</a>
            </li>

            <li>
              <a href="/">People</a>
            </li>

            <li>
              <a href="/">More</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="/">
                <Add />
              </a>
            </li>

            <li>
              <a href="/">
                <div className="box-visible">EN</div>
              </a>
            </li>

            <li>
              <a href="/">Login</a>
            </li>

            <li>
              <a href="/">Join TMDb</a>
            </li>

            <li>
              <a href="/">
                <Search style={{ color: "#64b5f6" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
