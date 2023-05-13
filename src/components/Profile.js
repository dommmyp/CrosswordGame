import { useContext, useState } from "react";
import { FileContext } from "../FileContext";

const Profile = (props) => {
  const { self, setSelf } = useContext(FileContext);
  const [friendsData, setFriendsData] = useState(null);
  // ''self' 'showFriends' 'addFriends'
  const [profileState, setProfileState] = useState("self");

  const showFriends = async () => {
    const friends = await props.getUsers();
    setFriendsData(friends);
  };

  const addFriend = async (friend) => {
    await props.addFriend(friend);
    showFriends();
  };
  const removeFriend = async (friend) => {
    await props.removeFriend(friend);
    showFriends();
  };

  return (
    <div>
      {self && (
        <div
          className={
            props.show
              ? "profilePage profileFullHeight"
              : "profilePage profileHide"
          }
          style={{ width: props.show ? "block" : "none" }}
        >
          <div className="profileNav">
            <div
              onClick={() => setProfileState("self")}
              className={
                profileState === "self"
                  ? "profileNavItemActive"
                  : "profileNavItem"
              }
            >
              info
            </div>
            <div
              onClick={() => setProfileState("showFriends")}
              className={
                profileState === "showFriends"
                  ? "profileNavItemActive"
                  : "profileNavItem"
              }
            >
              friends
            </div>
            <div
              onClick={() => setProfileState("addFriends")}
              className={
                profileState === "addFriends"
                  ? "profileNavItemActive"
                  : "profileNavItem"
              }
            >
              add
            </div>
            <div
              className="closeButton"
              onClick={() => props.setShowProfile(false)}
            >
              x
            </div>
          </div>
          <div
            className="profileSection"
            style={{ display: profileState === "self" ? "block" : "none" }}
          >
            <div>{self.name}</div>
            <div>{self.email}</div>
            <div>{self.uid}</div>
          </div>
          <div
            className="profileSection"
            style={{
              display: profileState === "showFriends" ? "block" : "none",
            }}
          >
            {self.friends &&
              self.friends.map((item) => {
                return (
                  <div className="friendItem">
                    {item.name}
                    <button
                      onClick={() => removeFriend(item)}
                      className="friendButton"
                    >
                      -
                    </button>
                  </div>
                );
              })}
          </div>
          <div
            className="profileSection"
            style={{
              display: profileState === "addFriends" ? "block" : "none",
            }}
          >
            <div className="friendsProfile">
              <div>Add Friends</div>
              <input className="friendSearch" type="text" />
              <button onClick={() => showFriends()}>search</button>
              <br />
              {friendsData &&
                friendsData.map((item, index) => {
                  return (
                    <div className="friendItem" key={index}>
                      <div>{item.email}</div>
                      <button
                        onClick={() => addFriend(item)}
                        className="friendButton"
                      >
                        +
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          {props.currentUser && (
            <button
              style={{ bottom: "20px", right: "20px", position: "absolute" }}
              onClick={() => {
                props.signOut();
                setSelf(null);
              }}
            >
              sign out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
