import React, { useState, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Load messages from local storage if they exist
  const getStoredMessages = () => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : null;
  };

  useEffect(() => {
    const storedMessages = getStoredMessages();
    if (storedMessages) {
      config.initialMessages = storedMessages;
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-toggle-bubble" onClick={handleToggle}>
          <ChatBubbleOutlineRoundedIcon />
        </div>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Help Bot</span>
            <button onClick={handleToggle}>
              <ClearRoundedIcon />
            </button>
          </div>
          <Chatbot
            className="chatbot-main"
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
