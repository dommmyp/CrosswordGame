import { useEffect, useState, useContext } from "react";
import { FileContext } from "../FileContext";

const EndGameModal = (props) => {
  const [names, setNames] = useState([]);
  const { activeCrosswordInfo } = useContext(FileContext);
  useEffect(() => {
    getNameHelper();
  }, []);

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
    <div className="modal">
      <div className="modalTitle">Congratulations</div>

      <div className="innerModal">
        {names &&
          props.scores &&
          names.map((item, index) => {
            return (
              <div className="modalItem">
                <div>{item}</div>
                <div>{props.scores[index]}</div>
              </div>
            );
          })}
      </div>
      <div
        className="modalCloseButton"
        onClick={() => props.setComplete(false)}
      >
        x
      </div>
    </div>
  );
};

export default EndGameModal;
