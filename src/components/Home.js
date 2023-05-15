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

  const removeCrossword = (index) => {
    props.removeCrossword(index);
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
          return item !== uid;
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
          Welcome to Head2HeadPuzzles.com, the ultimate online destination for
          competitive puzzle gaming with friends. Join now and challenge your
          friends to epic puzzle showdowns!
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
          <div className="crosswordListWrapper">
            {(startBattle || cont) && (
              <button
                className="homepageButton "
                style={{ margin: "10px", borderRadius: "80px" }}
                onClick={() => {
                  setStartBattle(false);
                  setCont(false);
                  setOpponentsReady(false);
                }}
              >
                cancel
              </button>
            )}
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
                  <div key={index} className="crosswordListItem">
                    <Link to="/crossword" onClick={() => newCrossword(index)}>
                      {item.content.info.title}
                    </Link>
                  </div>
                );
              })}
            {self &&
              cont &&
              self.crosswords.map((item, index) => {
                return (
                  <div
                    to="/crossword"
                    key={index}
                    className="crosswordListItem"
                  >
                    <Link
                      to="/crossword"
                      onClick={() => resumeCrossword(index)}
                    >
                      {item.name}
                    </Link>
                    <div
                      className="removeButton"
                      onClick={() => removeCrossword(index)}
                    >
                      -
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
