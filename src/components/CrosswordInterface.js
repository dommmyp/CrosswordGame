import { useContext } from "react";
import { FileContext } from "../FileContext";

const CrosswordInterface = (props) => {
  const { activeCrosswordInfo } = useContext(FileContext);

  return (
    <div className="interface">
      <div className="scores">
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Player 1:
          <div style={{ color: "rgb(121, 13, 63)" }}>
            {activeCrosswordInfo.scores[0]}
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            display: activeCrosswordInfo.scores[1] != 0 ? "block" : "none",
          }}
        >
          Player 2:
          <div style={{ color: "rgb(40, 109, 139)" }}>
            {activeCrosswordInfo.scores[1]}
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            display: activeCrosswordInfo.scores[2] != 0 ? "block" : "none",
          }}
        >
          Player 3:
          <div style={{ color: "rgb(40, 109, 139)" }}>
            {activeCrosswordInfo.scores[2]}
          </div>
        </div>
        <div
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            display: activeCrosswordInfo.scores[3] != 0 ? "block" : "none",
          }}
        >
          Player 4:
          <div style={{ color: "rgb(40, 109, 139)" }}>
            {activeCrosswordInfo.scores[3]}
          </div>
        </div>
        {/* <div className='graph'>
          <div className='bar' style={{width: activeCrosswordInfo.scores[0]+ '%', background: 'rgb(171, 63, 113)'}}></div>
          <div className='bar' style={{width: activeCrosswordInfo.scores[1] + '%', background: "rgb(90, 159, 189)"}}></div>
        </div> */}
      </div>
      <div className="actions">
        {props.activeAction === 0 && (
          <div>
            <button
              onClick={() => {
                props.submitChallenge();
                props.hideActionPanel();
              }}
            >
              Submit Challenge
            </button>
          </div>
        )}

        {props.activeAction === 1 && <div>reveal</div>}
        {props.activeAction === 2 && <div>hint</div>}
      </div>
    </div>
  );
};
export default CrosswordInterface;
