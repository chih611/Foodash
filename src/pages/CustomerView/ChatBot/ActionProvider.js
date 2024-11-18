class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHelp = () => {
    const message = this.createChatBotMessage(
      "Sure! I can help you with navigation, understanding features, and more. What do you need assistance with?"
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleNavigate = () => {
    const message = this.createChatBotMessage(
      "To navigate, you can click on the menu at the top to explore different sections of the application."
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "I'm sorry, I didn't quite understand. Could you please rephrase?"
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
