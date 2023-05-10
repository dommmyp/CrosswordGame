import "./App.css";
import Crossword from "./components/Crossword";
import Navbar from "./components/Navbar";
import Sudoku from "./components/Sudoku";
import Minesweeper from "./components/Minesweeper";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FileContext } from "./FileContext";
import { useContext } from "react";
import Profile from "./components/Profile";

const firebaseConfig = {
  apiKey: "AIzaSyCIGdeFe7YKjSszKSEbKrFhiE0CnY7CuKg",
  authDomain: "head2headpuzzles.firebaseapp.com",
  databaseURL: "https://head2headpuzzles-default-rtdb.firebaseio.com",
  projectId: "head2headpuzzles",
  storageBucket: "head2headpuzzles.appspot.com",
  messagingSenderId: "944464339941",
  appId: "1:944464339941:web:43b1c301a2ec204acf850c",
  measurementId: "G-XX8DWT0QN7",
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = getFirestore(app);
const userRef = collection(db, "users");
const crosswordsRef = collection(db, "crosswords");

function App() {
  const {
    self,
    setSelf,
    activeCrosswordInfo,
    setActiveCrosswordInfo,
    activeCrossword,
    setActiveCrossword,
    setActiveSolution,
    activeSolution,
    setFriendsList,
  } = useContext(FileContext);
  const [crosswords, setCrosswords] = useState([]);
  const [user] = useAuthState(auth);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    getCrosswordData();
  }, []);

  useEffect(() => {
    async function x() {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      const docSnapUser = await getDoc(userDoc);
      const userData = docSnapUser.data();
      setSelf(userData);

      const snapshot = await firebase.firestore().collection("users").get();
      let friendsData = [];
      snapshot.docs.map((doc) => friendsData.push(doc.data()));
      setFriendsList(friendsData);
    }
    if (auth.currentUser) {
      x();
    }
  }, [auth.currentUser]);

  const getCrosswordData = async () => {
    const response = await fetch(
      "https://api.foracross.com/api/puzzle_list?page=0&pageSize=50&filter[nameOrTitleFilter]=&filter[sizeFilter][Mini]=true&filter[sizeFilter][Standard]=true"
    );
    const jsonData = await response.json();
    setCrosswords(jsonData.puzzles);
  };

  const resumeCrossword = async (index) => {
    const gameID = self.crosswords[index].gameID;
    const pid = self.crosswords[index].pid;
    onSnapshot(doc(db, "crosswords", gameID), (doc) => {
      const content = doc.data();
      const newArr = [];
      for (let i = 0; i < content.grid.length; i++) {
        newArr[i] = content.grid[i].x;
      }
      setActiveCrossword(newArr);
      setActiveCrosswordInfo({
        pid: content.pid,
        gameID: content.gameID,
        scores: content.scores,
        players: content.players,
      });
    });
    const docc = doc(db, "crosswords", gameID);
    const docSnap = await getDoc(docc);
    const data = docSnap.data();
    setActiveCrosswordInfo({
      pid: pid,
      gameID: gameID,
      scores: data.scores,
      players: data.players,
    });
    const content = data.grid;
    const newArr = [];
    for (let i = 0; i < content.length; i++) {
      newArr[i] = content[i].x;
    }
    setActiveCrossword(newArr);
    let cross = crosswords.filter((item) => {
      return item.pid === pid;
    });
    setActiveSolution(cross[0].content);
  };

  const newCrossword = async (index, opponentIDs) => {
    const pid = crosswords[index].pid;
    const gameID = pid + "-" + Date.now();
    const players = [];
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const docSnapUser = await getDoc(userDoc);
    const userData = docSnapUser.data();

    // add new crossword to user crossword list in database
    userData.crosswords.push({
      gameID: gameID,
      name: crosswords[index].content.info.title,
      pid: pid,
      userNum: 0,
    });
    setSelf(userData);
    let currNum = 0;
    players[currNum++] = {
      uid: userData.uid,
      email: userData.email,
      name: userData.name,
    };
    await setDoc(doc(userRef, auth.currentUser.uid), {
      uid: userData.uid,
      crosswords: userData.crosswords,
      email: userData.email,
      name: userData.name,
      pendingGames: userData.pendingGames,
      friends: userData.friends,
    });

    await opponentIDs.forEach(async (oppID) => {
      const oppDoc = doc(db, "users", oppID);
      const docSnapOpp = await getDoc(oppDoc);
      const oppData = docSnapOpp.data();
      oppData.crosswords.push({
        gameID: gameID,
        name: crosswords[index].content.info.title,
        pid: pid,
        userNum: currNum++,
      });
      await setDoc(doc(userRef, oppID), {
        uid: oppData.uid,
        crosswords: oppData.crosswords,
        email: oppData.email,
        name: oppData.name,
        pendingGames: oppData.pendingGames,
        friends: oppData.friends,
      });
      players[currNum++] = {
        uid: oppData.uid,
        email: oppData.email,
        name: oppData.name,
      };
    });

    const emptyCross = [];
    const arr = [];
    for (let i = 0; i < crosswords[index].content.grid.length; i++) {
      emptyCross[i] = {};
      arr[i] = [];
      for (let j = 0; j < crosswords[index].content.grid[0].length; j++) {
        arr[i][j] = {
          user: -1,
          content: "",
          confirmed: false,
          challenge: false,
        };
      }
      emptyCross[i].x = arr[i];
    }
    await setDoc(doc(crosswordsRef, gameID), {
      grid: emptyCross,
      pid: pid,
      gameID: gameID,
      scores: [0, 0, 0, 0],
      players: players,
    });
    setActiveCrossword(arr);

    onSnapshot(doc(db, "crosswords", gameID), (doc) => {
      const content = doc.data();
      const newArr = [];
      for (let i = 0; i < content.grid.length; i++) {
        newArr[i] = content.grid[i].x;
      }
      setActiveCrossword(newArr);
      setActiveCrosswordInfo({
        pid: content.pid,
        gameID: content.gameID,
        scores: content.scores,
        players: content.players,
      });
    });
    setActiveCrosswordInfo({
      pid: pid,
      gameID: gameID,
      scores: [0, 0, 0, 0],
      players: players,
    });
    setActiveSolution(crosswords[index].content);
  };

  const updateCrossword = async () => {
    let newGrid = [];
    for (let i = 0; i < activeCrossword.length; i++) {
      newGrid[i] = { x: activeCrossword[i] };
    }
    await setDoc(doc(crosswordsRef, activeCrosswordInfo.gameID), {
      gameID: activeCrosswordInfo.gameID,
      grid: newGrid,
      pid: activeCrosswordInfo.pid,
      scores: activeCrosswordInfo.scores,
      players: activeCrosswordInfo.players,
    });
    checkComplete();
  };

  const checkComplete = () => {
    let correct = true;
    activeCrossword.forEach((item, i) => {
      item.forEach((subItem, j) => {
        if (subItem.content !== ".") {
          if (subItem.content !== activeSolution.grid[i][j].toLowerCase()) {
            correct = false;
          } else {
            console.log("correct");
          }
        }
      });
    });
    if (correct) {
      window.alert("correct");
    }
  };

  const getUsers = async () => {
    const snapshot = await firebase.firestore().collection("users").get();
    let friendsData = [];
    snapshot.docs.map((doc) => {
      // console.log(doc.data())
      if (
        self.friends.filter((item) => {
          return item.uid === doc.data().uid;
        }).length === 0 &&
        doc.data().uid !== self.uid
      ) {
        friendsData.push(doc.data());
      }
      return false;
    });
    return friendsData;
  };

  const addFriend = async (friend) => {
    const newFriends = self.friends;
    console.log(friend);
    console.log(newFriends);
    const filter = newFriends.filter((item) => {
      return item.uid === friend.uid;
    });
    if (filter.length !== 0) {
      console.log("same");
      return;
    }
    if (friend.uid === self.uid) {
      console.log("self");
      return;
    }
    newFriends.push({
      email: friend.email,
      name: friend.name,
      uid: friend.uid,
    });
    await setDoc(doc(userRef, self.uid), {
      uid: self.uid,
      crosswords: self.crosswords,
      email: self.email,
      name: self.name,
      pendingGames: self.pendingGames,
      friends: newFriends,
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setShowProfile={setShowProfile} showProfile={showProfile} />
        <Profile
          show={showProfile}
          addFriend={addFriend}
          currentUser={auth.currentUser}
          signOut={() => auth.signOut()}
          getUsers={() => getUsers()}
        />
        {user ? (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    newCrossword={newCrossword}
                    crosswords={crosswords}
                    resumeCrossword={resumeCrossword}
                  />
                }
              />
              <Route
                path="/crossword"
                element={<Crossword updateCrossword={updateCrossword} />}
              />
              <Route path="/sudoku" element={<Sudoku />} />
              <Route path="/minesweeper" element={<Minesweeper />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </>
        ) : (
          <SignIn />
        )}
      </BrowserRouter>
    </div>
  );
}

const SignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    const q = query(
      collection(db, "users"),
      where("uid", "===", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      await setDoc(doc(userRef, auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        crosswords: [],
        email: auth.currentUser.email,
        name: auth.currentUser.displayName,
        pendingGames: [],
        friends: [],
      });
    }
  };

  return (
    <button className="logIn" onClick={signInWithGoogle}>
      Sign In
    </button>
  );
};

export default App;
