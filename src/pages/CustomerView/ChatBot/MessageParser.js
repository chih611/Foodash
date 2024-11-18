class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("navigate")) {
      this.actionProvider.handleNavigate();
    } else if (
      lowerCaseMessage.includes("contact") ||
      lowerCaseMessage.includes("refund")
    ) {
      this.actionProvider.handleContact();
    } else if (
      lowerCaseMessage.includes("sign up") ||
      lowerCaseMessage.includes("register") ||
      lowerCaseMessage.includes("create account")
    ) {
      this.actionProvider.handleSignUp();
    } else if (
      lowerCaseMessage.includes("login") ||
      lowerCaseMessage.includes("log in") ||
      lowerCaseMessage.includes("sign in")
    ) {
      this.actionProvider.handleSignIn();
    } else if (
      lowerCaseMessage.includes("order history") ||
      lowerCaseMessage.includes("history") ||
      (lowerCaseMessage.includes("track") &&
        lowerCaseMessage.includes("order")) ||
      lowerCaseMessage.includes("tracking")
    ) {
      this.actionProvider.handleOrderHistory();
    } else if (lowerCaseMessage.includes("order")) {
      this.actionProvider.handlePlaceOrder();
    } else if (
      lowerCaseMessage.includes("help") ||
      lowerCaseMessage.includes("hello") ||
      lowerCaseMessage.includes("hi")
    ) {
      this.actionProvider.handleHelp();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;
