class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("help")) {
      this.actionProvider.handleHelp();
    } else if (lowerCaseMessage.includes("navigate")) {
      this.actionProvider.handleNavigate();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;
