import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";

const config = {
  botName: "HelpBot",
  initialMessages: [createChatBotMessage("Hi! How can I assist you today?")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#f38b3c",
    },
    chatButton: {
      backgroundColor: "#f38b3c",
    },
  },
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
};

export default config;
