import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { Clear } from "@mui/icons-material";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 100 }}
    >
      {!isOpen && (
        <div
          className="chatbot-toggle-bubble"
          onClick={handleToggle}
          style={{
            backgroundColor: "#f38b3c",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ChatBubbleOutlineRoundedIcon
            style={{ color: "white", fontSize: "30px" }}
          />
        </div>
      )}

      {isOpen && (
        <div className="chatbot-window" style={{ width: "350px" }}>
          <div
            className="chatbot-header"
            style={{
              backgroundColor: "#f38b3c",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Help Bot</span>
            <button
              onClick={handleToggle}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              <ClearRoundedIcon />
            </button>
          </div>
          <Chatbot
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
