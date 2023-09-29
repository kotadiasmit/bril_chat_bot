import { useEffect, useRef, useState } from "react";
import Chats from "../Chats/Chats";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./ChatPage.scss";

const APP_URL = process.env.REACT_APP_REPLY;
const URL_TOKEN = process.env.REACT_APP_TOKEN;

const ChatPage = () => {
  const [chatMsgInput, setChatMsgInput] = useState("");
  const [chatsArray, setChatsArray] = useState([]);
  const [respLoading, setRespLoading] = useState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatsArray]);

  useEffect(() => {
    if (!respLoading && chatsArray.length) {
      setTimeout(() => {
        let addBotReply = {
          id: chatsArray.length + 1 + "b",
          name: "Bot",
          chatMsg: "Hi I am bot user. How can I help you?",
        };
        setChatsArray([...chatsArray, addBotReply]);
        setRespLoading(false);
      }, 100);
    }
  }, [respLoading]);

  const onChatMsgInputChanged = (event) => {
    const { value } = event.target;
    setChatMsgInput(value);
  };

  const onChatMsgSubmit = (event) => {
    event.preventDefault();
    const trimmedChatBotUserInput = chatMsgInput.trim();
    if (trimmedChatBotUserInput) {
      let addChatMsg = {
        id: chatsArray.length + 1 + "u",
        name: "Smit",
        chatMsg: trimmedChatBotUserInput,
      };
      setChatsArray([...chatsArray, addChatMsg]);
      setRespLoading(true);
      getBotReply();
      setChatMsgInput("");
    } else {
      alert("please enter valid message");
    }
  };
  const getBotReply = () => {
    axios
      .get(APP_URL, {
        headers: {
          Authorization: URL_TOKEN,
        },
      })
      .then((response) => {
        response.status === 200 && setRespLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!", {
          position: "bottom-center",
          theme: "colored",
        });
      });
  };

  return (
    <div className="chat-main-container">
      <div className="chats-container">
        {chatsArray.map((chat) => (
          <Chats key={chat.id} chat={chat} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-container" onSubmit={onChatMsgSubmit}>
        <input
          className="chat-input"
          type="text"
          id="userInput"
          placeholder="Send a Message"
          value={chatMsgInput}
          onChange={onChatMsgInputChanged}
          autoFocus
        />
        <button
          className={`send-btn ${
            chatMsgInput && !respLoading && "send-btn-active"
          }`}
          type="submit"
          disabled={respLoading}
        >
          {respLoading ? (
            <span className="send-icon">...</span>
          ) : (
            <i
              className={`fa fa-paper-plane send-icon ${
                chatMsgInput && "send-icon-active"
              }`}
              aria-hidden="true"
            ></i>
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default ChatPage;
