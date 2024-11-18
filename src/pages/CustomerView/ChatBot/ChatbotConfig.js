import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";

const config = {
  botName: "FoodDashBot",
  initialMessages: [createChatBotMessage("Hi! How can I assist you today?")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5A9",
    },
    chatButton: {
      backgroundColor: "#5A9",
    },
  },
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
};

export default config;
