import { Link, useLocation } from "react-router-dom";
import logo from "../resources/H2Hlogo.png";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState, useRef } from "react";

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  // const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const location = useLocation();
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div className="navbar">
      <Link
        className="title"
        onClick={() => props.setShowProfile(false)}
        to="/"
      >
        <img src={logo} alt="hello" />
      </Link>
      {window.location.pathname === "/" && (
        <>
          <Link
            className="navButton"
            to="/wordhunt"
            style={{
              display: windowSize[0] < 600 && !showMenu ? "none" : "block",
            }}
          >
            Word Hunt
          </Link>
          <Link
            className="navButton"
            to="/sudoku"
            style={{
              display: windowSize[0] < 600 && !showMenu ? "none" : "block",
            }}
          >
            Sudoku
          </Link>
          <Link
            className="navButton"
            to="/crossword"
            style={{
              display: windowSize[0] < 600 && !showMenu ? "none" : "block",
            }}
          >
            Crossword
          </Link>
          {windowSize[0] < 600 ? (
            <div
              onClick={() => {
                setShowMenu(false);
                props.setShowProfile(!props.showProfile);
              }}
              style={{
                display: windowSize[0] < 600 && !showMenu ? "none" : "block",
              }}
              className="navButton"
            >
              Profile
            </div>
          ) : (
            <CgProfile
              onClick={() => props.setShowProfile(!props.showProfile)}
              className="menuButton"
              style={{
                display: windowSize[0] < 600 && !showMenu ? "none" : "block",
              }}
            />
          )}
          <FaBars
            style={{ display: windowSize[0] >= 600 ? "none" : "block" }}
            className="menuButton"
            onClick={() => setShowMenu(!showMenu)}
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
