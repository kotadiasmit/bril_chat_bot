import botIcon from "../../images/botIcon.png";
import "./Chats.scss";

const Chats = ({ chat }) => {
  const { name, chatMsg } = chat;
  const isBot = name === "Bot";
  return (
    <div className={`chat-sub-container ${isBot && "chat-content-dir"}`}>
      {isBot && <img src={botIcon} alt="bot-reply" className="bot-icon" />}
      <p className={`chat ${!isBot && "text-dir"}`}>{chatMsg}</p>
      {!isBot && (
        <div className="user-name-container">
          <p className="name">{name.slice(0, 2)}</p>
        </div>
      )}
    </div>
  );
};
export default Chats;
