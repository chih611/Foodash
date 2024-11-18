import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";
import LinkMessage from "./LinkMessages";

const config = {
  botName: "HelpBot",
  initialMessages: [createChatBotMessage("Hi! How can I assist you today?")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#f38b3c",
      width: "100%",
    },
    chatButton: {
      backgroundColor: "#f38b3c",
    },
  },
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },
  widgets: [
    {
      widgetName: "homePageLink",
      widgetFunc: () => <LinkMessage linkText="Go to Home Page" linkUrl="/" />,
    },
    {
      widgetName: "contactUsLink",
      widgetFunc: () => (
        <LinkMessage
          linkText="Go to contact us"
          linkUrl="/CustomerView/LandingPage/LandingContact/"
        />
      ),
    },
    {
      widgetName: "registerLink",
      widgetFunc: () => (
        <LinkMessage
          linkText="Go to register"
          linkUrl="/CustomerView/Register/"
        />
      ),
    },
    {
      widgetName: "signInLink",
      widgetFunc: () => (
        <LinkMessage linkText="Go to sign in" linkUrl="/CustomerView/SignIn/" />
      ),
    },
    {
      widgetName: "homePageLink",
      widgetFunc: () => (
        <LinkMessage
          linkText="Go to home page"
          linkUrl="/CustomerView/HomePage"
        />
      ),
    },
  ],
};

export default config;
