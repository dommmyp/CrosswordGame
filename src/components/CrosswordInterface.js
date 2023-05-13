import { useContext } from "react";
import { FileContext } from "../FileContext";

const CrosswordInterface = (props) => {
  const { activeCrosswordInfo } = useContext(FileContext);

  return (
    <div className="interface">
      <div className="scores">
        <div className="actionTitle">Scores</div>
        <div className="scoreItem">
          Player 1:
          <div style={{ color: "rgb(121, 13, 63)" }}>
            {activeCrosswordInfo.scores[0]}
          </div>
        </div>
        <div
          className="scoreItem"
          style={{
            display: activeCrosswordInfo.scores[1] != 0 ? "block" : "none",
          }}
        >
          Player 2:
          <div style={{ color: "rgb(40, 109, 139)" }}>
            {activeCrosswordInfo.scores[1]}
          </div>
        </div>
        <div
          className="scoreItem"
          style={{
            display: activeCrosswordInfo.scores[2] != 0 ? "block" : "none",
          }}
        >
          Player 3:
          <div style={{ color: "rgb(40, 109, 139)" }}>
            {activeCrosswordInfo.scores[2]}
          </div>
        </div>
        <div
          className="scoreItem"
          style={{
            display: activeCrosswordInfo.scores[3] != 0 ? "block" : "none",
          }}
        >
          Player 4:
          <div style={{ color: "rgb(40, 109, 139)" }}>
            {activeCrosswordInfo.scores[3]}
          </div>
        </div>
      </div>
      <div className="actions">
        {props.activeAction === 0 && (
          <>
            <div className="actionTitle">Challenge</div>
            <div className="actionContent">
              <div>Select boxes to challenge</div>
              <button
                onClick={() => {
                  props.submitChallenge();
                  props.hideActionPanel();
                }}
                className="actionButton"
              >
                Submit Challenge
              </button>
            </div>
          </>
        )}

        {props.activeAction === 1 && (
          <>
            <div className="actionTitle">Reveal</div>
            <div className="actionContent">
              <div>Select boxes to reveal</div>
              <button
                className="actionButton"
                onClick={() => {
                  props.submitReveal();
                  props.hideActionPanel();
                }}
              >
                Submit Reveal
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
