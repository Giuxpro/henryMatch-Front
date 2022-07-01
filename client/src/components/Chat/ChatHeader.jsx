// import { useAuth0 } from "react-cookie";

const ChatHeader = ({ user }) => {
  //   const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  //   const logout = () => {
  //     removeCookie("UserId", cookies.UserId);
  //     removeCookie("AuthToken", cookies.AuthToken);
  //     window.location.reload();
  //   };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.picture} alt={"photo of " + user.name} />
        </div>
        <h3>{user.name}</h3>
      </div>
      {/* <i className="log-out-icon" onClick={logout}>
        ⇦
      </i> */}
    </div>
  );
};

export default ChatHeader;
