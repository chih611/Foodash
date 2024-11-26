class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // Function to save messages to local storage
  saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  // Function to update chatbot state and save messages to local storage
  updateState = (newMessages) => {
    this.setState((prevState) => {
      const updatedMessages = [...prevState.messages, ...newMessages];
      this.saveMessagesToLocalStorage(updatedMessages);
      return {
        ...prevState,
        messages: updatedMessages,
      };
    });
  };

  handleHelp = () => {
    const message = this.createChatBotMessage(
      "Sure! I can help you with navigation, understanding features, and more. What do you need assistance with?"
    );
    this.updateState([message]);
  };

  handleNavigate = () => {
    const message = this.createChatBotMessage(
      "To navigate, you can click on the menu at the top to explore different sections of the application."
    );
    this.updateState([message]);
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "I'm sorry, I didn't quite understand. Could you please rephrase?"
    );
    this.updateState([message]);
  };

  handlePlaceOrder = () => {
    const messages = [
      this.createChatBotMessage("To place an order, follow these steps:"),
      this.createChatBotMessage(
        "1. Click on this link to get to the home page where you can view the menu:",
        { widget: "homePageLink" }
      ),
      this.createChatBotMessage(
        "2. Click on the **Category** to view items for each category."
      ),
      this.createChatBotMessage("3. Select the items you want to order."),
      this.createChatBotMessage("4. View the item's **information**."),
      this.createChatBotMessage(
        "5. Click **Add to Cart** to view applicable modifications."
      ),
      this.createChatBotMessage(
        "6. Select the **modifications** you want to apply."
      ),
      this.createChatBotMessage(
        "7. Click **Add to Cart** again to add the item to your cart."
      ),
      this.createChatBotMessage(
        "8. Click on the **Cart Icon** to view your cart."
      ),
      this.createChatBotMessage(
        "9. Click the **Checkout Button** to proceed with your order."
      ),
      this.createChatBotMessage(
        "10. Fill in the required information and click **Place Order** to pay or **Create Quote** for a price estimate."
      ),
    ];

    this.updateState(messages);
  };

  handleOrderHistory = () => {
    const message = this.createChatBotMessage(
      "To view your order history or track an order, click on the **Order Tracking** tab. If you are not logged in, you will be prompted to log in to view your order history."
    );
    this.updateState([message]);
  };

  handleSignUp = () => {
    const message = this.createChatBotMessage(
      "To sign up or register a new account, simply follow this link:",
      { widget: "registerLink" }
    );
    this.updateState([message]);
  };

  handleSignIn = () => {
    const message = this.createChatBotMessage(
      "To sign in, simply follow this link:",
      {
        widget: "signInLink",
      }
    );
    this.updateState([message]);
  };

  handleContact = () => {
    const message = this.createChatBotMessage(
      "You can visit the home page by clicking the link below:",
      { widget: "contactUsLink" }
    );
    this.updateState([message]);
  };

  handleCancel = () => {
    const messages = [
      this.createChatBotMessage(
        "If you need to cancel your booking, please get in touch with us as soon as possible. Cancellations less than 48 hours prior to your booking may be liable for 50% of the catering cost"
      ),
      this.createChatBotMessage(
        "Changes can be made but your order must be finalised 7 days prior to the event. We will do our best to accommodate late/last minute bookings as we understand things don’t always go as planned."
      ),
    ];
    this.updateState(messages);
  };

  handleApplicablePayment = () => {
    const message = this.createChatBotMessage(
      "Once you confirm our quote we will send you an invoice. Payment can then be made by EFT bank transfer."
    );
    this.updateState([message]);
  };
}

export default ActionProvider;
