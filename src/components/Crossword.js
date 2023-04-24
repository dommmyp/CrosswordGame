import { useState, useEffect, useRef, useContext } from "react";
import CrosswordInterface from "./CrosswordInterface";
import { FileContext } from "../FileContext";
import { Link } from "react-router-dom";

const Crossword = (props) => {
  const {
    activeCrossword,
    activeSolution,
    setActiveCrossword,
    self,
    activeCrosswordInfo,
  } = useContext(FileContext);
  const [active, setActive] = useState([0, 0]);
  const [activeLine, setActiveLine] = useState([[]]);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [clueNums, setClueNums] = useState(null);
  const [currUser, setCurrUser] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [challengeActive, setChallengeActive] = useState(false);
  const [activeClueNum, setActiveClueNum] = useState(0);

  const downRef = useRef([])
  const acrossRef = useRef([])

  useEffect(()=>{
    if(isHorizontal){
      // acrossRef.current?[activeClueNum].scrollIntoView({ behavior: "smooth" })
      acrossRef.current[activeClueNum]?.scrollIntoView({ behavior: "smooth",block: "nearest", inline: "nearest" });
    } else{
      downRef.current[activeClueNum]?.scrollIntoView({ behavior: "smooth",block: "nearest", inline: "nearest" });
    }
  },[activeClueNum])

  useEffect(() => {
    if (activeCrosswordInfo) {
      if (self) {
        let count = 0;
        const userNum = self.crosswords.filter((item) => {
          if (item.gameID === activeCrosswordInfo.gameID) {
            count++;
            return true;
          }
        });
        if (count != 0) {
          setCurrUser(userNum[0].userNum);
        }
      }
    }
  }, [activeCrosswordInfo]);

  const deleteLetter = () => {
    if (isHorizontal) {
      let a = active[0];
      let b = active[1] - 1;
      while (true) {
        if (b == -1) {
          a--;
          b = activeSolution.grid[0].length - 1;
        }
        if (a == -1) {
          a = activeSolution.grid.length - 1;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }

        b--;
      }
      doActive(a, b);
    } else {
      let a = active[0] - 1;
      let b = active[1];
      while (true) {
        if (a == -1) {
          b--;
          a = activeSolution.grid.length - 1;
        }
        if (b == -1) {
          b = activeSolution.grid[0].length - 1;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }
        a--;
      }
      doActive(a, b);
    }
    setActiveCrossword(activeCrossword.map((x) => x));
    props.updateCrossword();
  };

  const addLetter = () => {
    if (isHorizontal) {
      let a = active[0];
      let b = active[1] + 1;
      while (true) {
        if (b == activeSolution.grid[0].length) {
          a++;
          b = 0;
        }
        if (a == activeSolution.grid.length) {
          a = 0;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }

        b++;
      }
      doActive(a, b);
    } else {
      let a = active[0] + 1;
      let b = active[1];
      while (true) {
        if (a == activeSolution.grid.length) {
          b++;
          a = 0;
        }
        if (b == activeSolution.grid[0].length) {
          b = 0;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }
        a++;
      }
      doActive(a, b);
    }
    setActiveCrossword(activeCrossword.map((x) => x));
    props.updateCrossword();
  };

  const onArrow = (arrow) => {
    if (arrow == "ArrowRight") {
      let a = active[0];
      let b = active[1] + 1;

      if(!isHorizontal){
        b--;
      }
      setIsHorizontal(true);
      while (true) {
        if (b == activeSolution.grid[0].length) {
          a++;
          b = 0;
        }
        if (a == activeSolution.grid.length) {
          a = 0;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }

        b++;
      }
      doActive(a, b, 1);
    }
    if (arrow == "ArrowDown") {
      let a = active[0] + 1;
      let b = active[1];
      if(isHorizontal){
        a--;
      }
      setIsHorizontal(false);
      while (true) {
        if (a == activeSolution.grid.length) {
          b++;
          a = 0;
        }
        if (b == activeSolution.grid[0].length) {
          b = 0;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }
        a++;
      }
      doActive(a, b, -1);
    }
    if (arrow == "ArrowLeft") {
      let a = active[0];
      let b = active[1] - 1;
      if(!isHorizontal){
        b++;
      }
      setIsHorizontal(true);
      while (true) {
        if (b == -1) {
          a--;
          b = activeSolution.grid[0].length - 1;
        }
        if (a == -1) {
          a = activeSolution.grid.length - 1;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }

        b--;
      }
      doActive(a, b, 1);
    }
    if (arrow == "ArrowUp") {
      let a = active[0] - 1;
      let b = active[1];
      if(isHorizontal){
        a++;
      }
      setIsHorizontal(false);
      while (true) {
        if (a == -1) {
          b--;
          a = activeSolution.grid.length - 1;
        }
        if (b == -1) {
          b = activeSolution.grid[0].length - 1;
        }
        if (activeSolution.grid[a][b] !== ".") {
          break;
        }
        a--;
      }
      doActive(a, b, -1);
    }

    setActiveCrossword(activeCrossword.map((x) => x));
  };

  const useKeyDown = (currUser, i, j, array, onAdd, onDelete, keys) => {
    const onKeyDown = (event) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        if (
          (array[i][j].content == "") | (array[i][j].user == currUser) &&
          !array[i][j].confirmed
        ) {
          array[i][j].content = event.key;
          array[i][j].user = currUser;
        }
        onAdd();
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        if (array[i][j].user == currUser) {
          array[i][j].content = "";
          array[i][j].user = -1;
        }
        onDelete();
      }
      if (
        (event.key === "ArrowUp") |
        (event.key === "ArrowDown") |
        (event.key === "ArrowLeft") |
        (event.key === "ArrowRight")
      ) {
        event.preventDefault();
        onArrow(event.key);
      }
    };
    useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [onKeyDown]);
  };
  useKeyDown(
    currUser,
    active[0],
    active[1],
    activeCrossword,
    addLetter,
    deleteLetter,
    [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ]
  );

  useEffect(() => {
    if (!activeSolution) {
      return;
    }
    let currIndex = 1;
    let tempClueNums = [];
    for (let i = 0; i < activeSolution.grid.length; i++) {
      tempClueNums[i] = [];
      for (let j = 0; j < activeSolution.grid[0].length; j++) {
        tempClueNums[i][j] = "";
      }
    }
    for (let i = 0; i < activeSolution.grid.length; i++) {
      for (let j = 0; j < activeSolution.grid.length; j++) {
        if (activeSolution.grid[i][j] == ".") {
          continue;
        }
        if (i == 0) {
          tempClueNums[i][j] = currIndex;
          currIndex++;
        } else if (activeSolution.grid[i - 1][j] === ".") {
          tempClueNums[i][j] = currIndex;
          currIndex++;
        } else if (j == 0) {
          tempClueNums[i][j] = currIndex;
          currIndex++;
        } else if (activeSolution.grid[i][j - 1] === ".") {
          tempClueNums[i][j] = currIndex;
          currIndex++;
        }
      }
    }
    setClueNums(tempClueNums);
  }, [activeSolution]);

  const doActive = (i, j, hor) => {
    let tempHor = isHorizontal;
    if (hor) {
      if (hor == 1) {
        setIsHorizontal(true);
        tempHor = true;
      }
      if (hor == -1) {
        setIsHorizontal(false);
        tempHor = false;
      }
    }
    if (activeSolution.length == 0) {
      return;
    }
    if (activeSolution.grid[i][j] == ".") {
      return;
    }
    if (active[0] == i && active[1] == j) {
      tempHor = !isHorizontal;
      setIsHorizontal(!isHorizontal);
    }
    if (activeSolution.grid[i][j] != ".") {
      setActive([i, j]);
    }
    let newLine = [];

    if (tempHor) {
      let a = i;
      let b = j + 1;
      if (b != activeSolution.grid[0].length) {
        while (activeSolution.grid[a][b] != ".") {
          newLine.push([a, b]);
          b++;
          if (b == activeSolution.grid[0].length) {
            break;
          }
        }
      }
      a = i;
      b = j - 1;
      if (b != -1) {
        while (activeSolution.grid[a][b] != ".") {
          newLine.push([a, b]);
          b--;
          if (b == -1) {
            break;
          }
        }
      }
    } else {
      let a = i + 1;
      let b = j;
      if (a != activeSolution.grid.length) {
        while (activeSolution.grid[a][b] != ".") {
          newLine.push([a, b]);
          a++;
          if (a == activeSolution.grid.length) {
            break;
          }
        }
      }
      a = i - 1;
      b = j;
      if (a != -1) {
        while (activeSolution.grid[a][b] != ".") {
          newLine.push([a, b]);
          a--;
          if (a == -1) {
            break;
          }
        }
      }
    }
    setActiveLine(newLine);
    getClue(i, j, tempHor);
  };

  const challenge = () => {
    setChallengeActive(true);
  };

  const submitChallenge = () => {
    setChallengeActive(false);
    for (let i = 0; i < activeCrossword.length; i++) {
      for (let j = 0; j < activeCrossword[0].length; j++) {
        if (!activeCrossword[i][j].challenge) {
          continue;
        }
        if (
          activeCrossword[i][j].content ==
          activeSolution.grid[i][j].toLowerCase()
        ) {
          activeCrossword[i][j].confirmed = true;
          activeCrosswordInfo.scores[activeCrossword[i][j].user]++;
          activeCrosswordInfo.scores[currUser]--;
        } else {
          activeCrossword[i][j].content = "";
          activeCrosswordInfo.scores[activeCrossword[i][j].user]--;
          activeCrosswordInfo.scores[currUser]++;
          activeCrossword[i][j].user = -1;
        }
        activeCrossword[i][j].challenge = false;
      }
    }
    props.updateCrossword();
    setScores(scores.map((x) => x));
  };

  const addChallengeItem = (i, j) => {
    if (
      activeCrossword[i][j].user != currUser &&
      activeCrossword[i][j].content != ""
    ) {
      activeCrossword[i][j].challenge = !activeCrossword[i][j].challenge;
    }
    setActiveCrossword(activeCrossword.map((x) => x));
  };

  const setActiveByClue = (index) => {
    setActiveClueNum(index);
    for (let i = 0; i < clueNums.length; i++) {
      for (let j = 0; j < clueNums[i].length; j++) {
        if (clueNums[i][j] == index) {
          doActive(i, j);
        }
      }
    }
  };

  const getClue = (i, j, tempHor) => {
    if (!tempHor) {
      while (true) {
        if (clueNums[i][j] != "") {
          if (activeSolution.clues.down[clueNums[i][j]]) {
            setActiveClueNum(clueNums[i][j]);
            return;
          }
        }
        i--;
      }
    }
    if (tempHor) {
      while (true) {
        if (clueNums[i][j] != "") {
          if (activeSolution.clues.across[clueNums[i][j]]) {
            setActiveClueNum(clueNums[i][j]);
            return;
          }
        }
        j--;
      }
    }
  };
  return (
    <>
      {activeSolution && clueNums && activeCrossword ? (
        <div className="crossword">
          <h3>
            {activeSolution.info.title} -- {activeSolution.info.author}
          </h3>
          <div>
              {!isHorizontal && (
                <div
                  className="clueHeader"
                  onClick={() => setIsHorizontal(true)}
                >
                  DOWN
                </div>
              )}
            <div className="clueList" style={{display: !isHorizontal ? 'block' : 'none'}}>
              {activeSolution &&
                !isHorizontal &&
                activeSolution.clues?.down.map((item, index) => {
                  return (
                    clueNums.length != 0 && (
                      <div
                        ref={(el) => (downRef.current[index] = el)}
                        className={"clue"}
                        style={{
                          background: activeClueNum == index ? "grey" : "",
                          display: item ? "block" : "none",
                        }}
                        key={index}
                        onClick={() => setActiveByClue(index)}
                      >
                        {item && (
                          <div>
                            {index}. {item}
                          </div>
                        )}
                      </div>
                    )
                  );
                })}
            </div>
              {isHorizontal && (
                <div
                  className="clueHeader"
                  onClick={() => setIsHorizontal(false)}
                >
                  ACROSS
                </div>
              )}
            <div className="clueList" style={{display: isHorizontal ? 'block' : 'none'}}>
              {activeSolution &&
                isHorizontal &&
                activeSolution.clues.across.map((item, index) => {
                  return (
                    clueNums.length != 0 && (
                      <div
                      ref={(el) => (acrossRef.current[index] = el)}
                        className={"clue"}
                        style={{
                          background: activeClueNum == index ? "grey" : "",
                          display: item ? "block" : "none",
                        }}
                        onClick={() => setActiveByClue(index)}
                      >
                        {item && (
                          <div>
                            {index}. {item}
                          </div>
                        )}
                      </div>
                    )
                  );
                })}
            </div>
          </div>
          <div className="grid">
            {activeCrossword.map((row, i) => {
              return (
                <div key={i} className={"gridRow"}>
                  {row.map((item, j) => {
                    return (
                      <div
                        key={j}
                        onClick={
                          challengeActive
                            ? () => addChallengeItem(i, j)
                            : () => doActive(i, j)
                        }
                        className={"gridItem"}
                        style={{
                          background:
                            activeSolution.grid[i][j] == "."
                              ? "none"
                              : "rgb(171, 193, 184)",
                        }}
                      >
                        <input
                          className="gridInput"
                          readOnly
                          type="text"
                          value=""
                        />
                        <div
                          className="active"
                          style={{
                            background:
                              active[0] == i && active[1] == j
                                ? "lightgrey"
                                : "",
                            zIndex: 400,
                            opacity: 0.5,
                          }}
                        ></div>
                        <div
                          className="boxContent"
                          style={{
                            fontSize:
                              activeSolution.grid.length > 15 ? "20px" : "30px",
                          }}
                        >
                          {item.content}
                        </div>
                        <div
                          className="activeLine"
                          style={{
                            background: activeLine.some(
                              (k) => k[0] == i && k[1] == j
                            )
                              ? "grey"
                              : "",
                            zIndex: 5,
                            opacity: 0.5,
                          }}
                        ></div>
                        {clueNums.length != 0 && (
                          <div className="clueNum">{clueNums[i][j]}</div>
                        )}
                        <div
                          className="correct"
                          style={{
                            boxShadow: activeCrossword[i][j].confirmed
                              ? "0 0 0 2px lightgreen inset"
                              : "",
                          }}
                        ></div>
                        <div
                          className="challenge"
                          style={{
                            boxShadow: activeCrossword[i][j].challenge
                              ? "0 0 0 3px pink inset"
                              : "",
                          }}
                        ></div>
                        <div
                          className="userColor"
                          style={{
                            display:
                              activeCrossword[i][j].user == 0
                                ? "block"
                                : "none",
                            background: "#477e89",
                          }}
                        ></div>
                        <div
                          className="userColor"
                          style={{
                            display:
                              activeCrossword[i][j].user == 1
                                ? "block"
                                : "none",
                            background: "#a37774",
                          }}
                        ></div>
                        <div
                          className="userColor"
                          style={{
                            display:
                              activeCrossword[i][j].user == 2
                                ? "block"
                                : "none",
                            background: "#83819f",
                          }}
                        ></div>
                        <div
                          className="userColor"
                          style={{
                            display:
                              activeCrossword[i][j].user == 3
                                ? "block"
                                : "none",
                            background: "#bfac80",
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <CrosswordInterface
            challenge={challenge}
            submitChallenge={submitChallenge}
            challengeActive={challengeActive}
          />
        </div>
      ) : (
        <Link to="/" className="noCrosswordLink">
          Select a crossword
        </Link>
      )}
    </>
  );
};

export default Crossword;
