import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = (props) => {
   const location = useLocation()



  return (
    <nav className="navbar">
      <Link className='title' to='/'>Head2HeadPuzzles</Link>
      <CgProfile className='profPic' onClick={()=>props.setShowProfile(!props.showProfile)}/>
      <Link to="/minesweeper" style={{background: (location?.pathname=='/minesweeper') ? 'rgb(65,65,65)' : '', color: (location?.pathname=='/minesweeper') ? 'rgb(171, 193, 184)' : ''}}>Minesweeper</Link>
      <Link to="/sudoku" style={{background: (location?.pathname=='/sudoku') ? 'rgb(65,65,65)' : '', color: (location?.pathname=='/sudoku') ? 'rgb(171, 193, 184)' : ''}}>Sudoku</Link>
      <Link to="/crossword" style={{background: (location?.pathname=='/crossword') ? 'rgb(65,65,65)' : '', color: (location?.pathname=='/crossword') ? 'rgb(171, 193, 184)' : ''}}>Crossword</Link>
      <Link to="/" style={{background: (location?.pathname=='/') ? 'rgb(65,65,65)' : '', color: (location?.pathname=='/') ? 'rgb(171, 193, 184)' : ''}}>Home</Link>
    </nav>
  );
};

export default Navbar;
