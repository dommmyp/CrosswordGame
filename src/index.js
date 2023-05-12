import "./styles/App.css";
import "./styles/CrosswordInterface.css";
import "./styles/Crossword.css";
import "./styles/Sudoku.css";
import "./styles/Profile.css";
import "./styles/Navbar.css";
import "./styles/Homepage.css";
import ReactDOM from "react-dom/client";
import ContextWrapper from "./ContextWrapper";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ContextWrapper />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
