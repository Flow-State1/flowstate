// ActionProvider starter code
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc //manipulates the state of the chatbot
    //  createClientMessage,
    //  stateRef,
    //  createCustomMessage,
    //  ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }
  helloWorldHandler = () => {
    //responding to users messages
    const message = this.createChatBotMessage(
      "Hello .I'm not self aware .Luckily!"
    );
    this.setChatbotMessage(message);
  };
  inAppqsHandler = () => {
    const message = this.createChatBotMessage("some options to help", {
      widget: "inAppqs"
    });
    this.setChatbotMessage(message);
  };
  setChatbotMessage = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}
    //  this.createChatBotMessage = createChatBotMessage;
    //  this.setState = setStateFunc; 
    //  this.createClientMessage = createClientMessage;
    //  this.stateRef = stateRef;
    //  this.createCustomMessage = createCustomMessage;
 
 export default ActionProvider;