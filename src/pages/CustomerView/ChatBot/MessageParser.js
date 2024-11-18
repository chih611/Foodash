class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("navigate")) {
      this.actionProvider.handleNavigate();
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
    } else if (lowerCaseMessage.includes("help")) {
      this.actionProvider.handleHelp();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;
