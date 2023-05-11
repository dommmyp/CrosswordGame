import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = (props) => {
  const location = useLocation();

  return (
    <div className="navbar">
      <Link className="title" to="/"></Link>
      <Link className="navButton" to="/wordhunt">
        Word Hunt
      </Link>
      <Link className="navButton" to="/sudoku">
        Sudoku
      </Link>
      <Link className="navButton" to="/crossword">
        Crossword
      </Link>
    </div>
  );
};

export default Navbar;
