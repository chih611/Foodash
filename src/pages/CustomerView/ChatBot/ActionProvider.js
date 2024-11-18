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

  handlePlaceOrder = () => {
    const messages = [
      this.createChatBotMessage("To place an order, follow these steps:"),
      this.createChatBotMessage(
        "1. Click on the **Category** to view items for each category."
      ),
      this.createChatBotMessage("2. Select the items you want to order."),
      this.createChatBotMessage("3. View the item's **information**."),
      this.createChatBotMessage(
        "4. Click **Add to Cart** to view applicable modifications."
      ),
      this.createChatBotMessage(
        "5. Select the **modifications** you want to apply."
      ),
      this.createChatBotMessage(
        "6. Click **Add to Cart** again to add the item to your cart."
      ),
      this.createChatBotMessage(
        "7. Click on the **Cart Icon** to view your cart."
      ),
      this.createChatBotMessage(
        "8. Click the **Checkout Button** to proceed with your order."
      ),
      this.createChatBotMessage(
        "9. Fill in the required information and click **Place Order** to pay or **Create Quote** for a price estimate."
      ),
    ];

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...messages],
    }));
  };

  handleOrderHistory = () => {
    const message = this.createChatBotMessage(
      "To view your order history or track an order, click on the **Order Tracking** tab. If you are not logged in, you will be prompted to log in to view your order history."
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  handleSignUp = () => {
    const messages = [
      this.createChatBotMessage(
        "That depends on the current page that you are on. If you are in the Landing Page, click the Sign In button then click on register."
      ),
      this.createChatBotMessage(
        "If you are in the Home Page within the application, click on the Avatar symbol and click on the link prompting you to sign in. There you will see the register button."
      ),
    ];

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...messages],
    }));
  };

  handleSignIn = () => {
    const message = this.createChatBotMessage(
      "To sign in, click on the **Sign In** button at the top right corner of the page. Fill in your email and password and click **Sign In** to access your account."
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
