import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FileContext } from "../FileContext";
import crosswordPic from "../resources/crosswordPic.png";
import sudokuPic from '../resources/sudokuPic.png'
import $ from "jquery";

const Home = (props) => {
  const { self, friendsList } = useContext(FileContext);
  const [startBattle, setStartBattle] = useState(false);
  const [hasMyCrosswords, setHasMyCrosswords] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [cont, setCont] = useState(false);
  const [opponentsReady, setOpponentsReady] = useState(false);
  const root = document.documentElement;
  const handleMouseMove = useCallback((evt) => {
    let x = evt.clientX / $(window).width();
    let y = evt.clientY / $(window).height();

    root.style.setProperty("--mouse-x", x);
    root.style.setProperty("--mouse-y", y);
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    console.log("s");
  }, []);

  const newCrossword = (index) => {
    props.newCrossword(index, opponents);
  };

  const resumeCrossword = (index) => {
    props.resumeCrossword(index);
  };

  const initBattle = () => {
    setStartBattle(true);
    window.removeEventListener("mousemove", handleMouseMove);
    root.style.setProperty("--mouse-x", 0.5);
    root.style.setProperty("--mouse-y", 0.5);
  };

  const resumeBattle = () => {
    setCont(true);
    window.removeEventListener("mousemove", handleMouseMove);
    root.style.setProperty("--mouse-x", 0.5);
    root.style.setProperty("--mouse-y", 0.5);
  };

  const addOpponent = (uid) => {
    setOpponents([uid]);
  };

  const selectOpponent = () => {
    setOpponentsReady(true);
  };

  return (
    <div className="homePage">
      <div>
      <h2>Crossword</h2>
      <div className="subHomePage">
        <div className="imgContainer">
          <img src={crosswordPic} alt="Crosswords" className="crosswordPic" />
        </div>
        <div className="crosswordList">
          {hasMyCrosswords && <div className="myCrosswords"></div>}
          {!cont && !startBattle && (
            <button className="homepageButton" onClick={() => resumeBattle()}>
              continue game
            </button>
          )}
          {!startBattle && !cont && (
            <button className="homepageButton" onClick={() => initBattle()}>
              new game
            </button>
          )}
          <div className="crosswordListWrapper">
          {startBattle && !opponentsReady && friendsList && (
            <>
              {friendsList.map((item) => {
                return (
                  <button onClick={() => addOpponent(item.uid)}>
                    {item.email}
                  </button>
                );
              })}
              <button onClick={() => selectOpponent()}>submit</button>
            </>
          )}
          
          {props.crosswords &&
            opponentsReady &&
            props.crosswords.map((item, index) => {
              return (
                <Link
                  to="/crossword"
                  key={index}
                  className="crosswordListItem"
                  onClick={() => newCrossword(index)}
                >
                  <div>{item.content.info.title}</div>
                  <div>{item.content.info.author}</div>
                </Link>
              );
            })}
          {self &&
            cont &&
            self.crosswords.map((item, index) => {
              return (
                <Link
                  to="/crossword"
                  key={index}
                  className="crosswordListItem"
                  onClick={() => resumeCrossword(index)}
                >
                  <div>{item.name}</div>
                </Link>
              );
            })}
            </div>
        </div>
      </div>
      </div>
      <div style={{background: 'rgb(171, 193, 184)'}}>
      <h2 style={{color: 'rgb(32,32,32)'}}>Sudoku</h2>
      <div className="subHomePage">
      <div className="imgContainer">
          <img src={sudokuPic} alt="Sudokus" className="crosswordPic" />
        </div>
      </div>
      </div>
      <div >
      <h2 >Minesweeper</h2>
      <div className="subHomePage"></div>
      </div>
    </div>
  );
};

export default Home;
