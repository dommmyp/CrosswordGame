import { useContext } from "react";
import { FileContext } from "../FileContext";

const CrosswordInterface = (props) => {
  const {activeCrosswordInfo} = useContext(FileContext)

  return (
    <div className="interface">
      <div className="scores">
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          Player 1:<div style={{ color: "rgb(121, 13, 63)" }}>{activeCrosswordInfo.scores[0]}</div>
        </div>
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          Player 2:
          <div style={{ color: "rgb(40, 109, 139)" }}>{activeCrosswordInfo.scores[1]}</div>
        </div>
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          Player 3:
          <div style={{ color: "rgb(40, 109, 139)" }}>{activeCrosswordInfo.scores[2]}</div>
        </div>
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          Player 4:
          <div style={{ color: "rgb(40, 109, 139)" }}>{activeCrosswordInfo.scores[3]}</div>
        </div>
        <div className='graph'>
          <div className='bar' style={{width: activeCrosswordInfo.scores[0]+ '%', background: 'rgb(171, 63, 113)'}}></div>
          <div className='bar' style={{width: activeCrosswordInfo.scores[1] + '%', background: "rgb(90, 159, 189)"}}></div>
        </div>
      </div>
      {!props.challengeActive ?
      <button onClick={()=>props.challenge()}>Challenge</button> :
      <button onClick={()=>props.submitChallenge()}>Submit Challenge</button>
}
    </div>
  );
};
export default CrosswordInterface;
