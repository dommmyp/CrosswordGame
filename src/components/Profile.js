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

  return (
    <div>
      {self && (
        <div
          className={
            props.show
              ? "profilePage profileFullWidth"
              : "profilePage profileHide"
          }
          style={{ width: props.show ? "block" : "none" }}
        >
          <div className="profileNav">
            <div
              onClick={() => setProfileState("self")}
              className={
                profileState == "self"
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
              view
            </div>
            <div
              onClick={() => setProfileState("addFriends")}
              className={
                profileState == "addFriends"
                  ? "profileNavItemActive"
                  : "profileNavItem"
              }
            >
              add
            </div>
          </div>
          <div
            className="profileSection"
            style={{ display: profileState == "self" ? "block" : "none" }}
          >
            <button
              onClick={() => {
                console.log(self.friends);
              }}
            >
              asd
            </button>
            <div>{self.name}</div>
            <div>{self.email}</div>
            <div>{self.uid}</div>
          </div>
          <div
            className="profileSection"
            style={{
              display: profileState == "showFriends" ? "block" : "none",
            }}
          >
            {self.friends &&
              self.friends.map((item) => {
                return <div>{item.name}</div>;
              })}
          </div>
          <div
            className="profileSection"
            style={{ display: profileState == "addFriends" ? "block" : "none" }}
          >
            <div className="friendsProfile">
              <div>Add Friends</div>
              <input className="friendSearch" type="text" />
              <button onClick={() => showFriends()}>search</button>
              {friendsData &&
                friendsData.map((item, index) => {
                  return (
                    <div className="friendItem" key={index}>
                      <div>{item.email}</div>
                      <button onClick={() => addFriend(item)}>+</button>
                    </div>
                  );
                })}
            </div>
          </div>

          {props.currentUser && (
            <button
              style={{ bottom: "0", right: "0", position: "absolute" }}
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
