import { useContext, useState, useEffect } from "react";
import { FileContext } from "../FileContext";

const CrosswordInterface = (props) => {
  const { activeCrosswordInfo } = useContext(FileContext);
  const [names, setNames] = useState([]);
  const [runTimes, setRunTimes] = useState(0);

  useEffect(() => {
    if (runTimes < 4) {
      setRunTimes(runTimes + 1);
      getNameHelper();
    }
  }, [activeCrosswordInfo]);

  const getNameHelper = async () => {
    setNames([]);
    let p1 = await props.getName(activeCrosswordInfo.players[0]);
    names[p1.userNum] = p1.name.split(" ")[0];
    if (activeCrosswordInfo.players.length > 1) {
      let p2 = await props.getName(activeCrosswordInfo.players[1]);
      names[p2.userNum] = p2.name.split(" ")[0];
    }
    if (activeCrosswordInfo.players.length > 2) {
      let p3 = await props.getName(activeCrosswordInfo.players[2]);
      names[p3.userNum] = p3.name.split(" ")[0];
    }
    if (activeCrosswordInfo.players.length > 3) {
      let p4 = await props.getName(activeCrosswordInfo.players[3]);
      names[p4.userNum] = p4.name.split(" ")[0];
    }
    setNames(names.map((x) => x));
  };

  return (
    <div className="interface">
      <div className="scores">
        <div className="actionTitle">Scores</div>
        {activeCrosswordInfo.scores &&
          names &&
          names.map((item, index) => {
            return (
              <div className="scoreItem">
                {item}:<div>{activeCrosswordInfo.scores[index]}</div>
              </div>
            );
          })}
      </div>
      <div className="actions">
        {props.activeAction === 0 && (
          <>
            <div className="actionTitle">Challenge</div>
            <div className="actionContent">
              <button
                onClick={() => {
                  props.selectAll();
                }}
                className="actionButton"
              >
                Select All
              </button>
              <button
                onClick={() => {
                  props.submitChallenge();
                  props.hideActionPanel();
                }}
                className="actionButton"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {props.activeAction === 1 && (
          <>
            <div className="actionTitle">Reveal</div>
            <div className="actionContent">
              <button
                onClick={() => {
                  props.selectAll();
                }}
                className="actionButton"
              >
                Select All
              </button>
              <button
                className="actionButton"
                onClick={() => {
                  props.submitReveal();
                  props.hideActionPanel();
                }}
              >
                Submit
              </button>
            </div>
          </>
        )}
        {props.activeAction === 2 && (
          <>
            <div className="actionTitle">Hint</div>
            <div className="actionContent">
              <div>Hint not yet implemented</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CrosswordInterface;
