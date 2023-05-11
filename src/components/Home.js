import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FileContext } from "../FileContext";

const Home = (props) => {
  const { self, friendsList } = useContext(FileContext);
  const [startBattle, setStartBattle] = useState(false);
  const [hasMyCrosswords, setHasMyCrosswords] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [cont, setCont] = useState(false);
  const [opponentsReady, setOpponentsReady] = useState(false);

  const newCrossword = (index) => {
    props.newCrossword(index, opponents);
  };

  const resumeCrossword = (index) => {
    props.resumeCrossword(index);
  };

  const initBattle = () => {
    setStartBattle(true);
    const array = [];
    for (let i = 0; i < self.friends.length; i++) {
      array[i] = false;
    }
    setSelected(array);
  };

  const resumeBattle = () => {
    setCont(true);
  };

  const addOpponent = (uid, index) => {
    if (!selected[index]) {
      opponents.push(uid);
      setOpponents(opponents.map((x) => x));
    } else {
      setOpponents(
        opponents.filter((item) => {
          return item != uid;
        })
      );
    }
    selected[index] = !selected[index];
    setSelected(selected.map((x) => x));
  };

  const selectOpponent = () => {
    setOpponentsReady(true);
  };

  return (
    <div className="homePage">
      <div className="heroSection">
        <h2 className="bigTitle">Head2Head Puzzles</h2>
        <div className="heroText">
          This is filler text thi strh sr ts rth srth srt h srththis is filler
          text this is filler text this is filler text
        </div>
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
      </div>
      <div className="subHomePage">
        <div className="crosswordList" style={{ overflow: "hidden" }}>
          {hasMyCrosswords && <div className="myCrosswords"></div>}
          <div className="crosswordListWrapper">
            {startBattle && !opponentsReady && friendsList && (
              <>
                {self.friends.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => addOpponent(item.uid, index)}
                      style={{
                        background: selected[index] ? "#edecf9" : "",
                      }}
                    >
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
  );
};

export default Home;
