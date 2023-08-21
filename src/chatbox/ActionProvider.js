// ActionProvider starter code
class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,//manipulates the state of the chatbot
    //  createClientMessage,
    //  stateRef,
    //  createCustomMessage,
    //  ...rest
   )  
   {
    this.createChatBotMessage=createChatBotMessage;
    this.setState=setStateFunc;
  }
  helloWorldHandler=()=>{
    const message=this.createChatBotMessage("Hello .I'm not self aware .Luckily!")
    this.setChatbotMessage(message)
  }
    setChatbotMessage=(message)=>{
      this.setState(state=>({...state,messages:[...state.messages,message]}))
    }
  }
    //  this.createChatBotMessage = createChatBotMessage;
    //  this.setState = setStateFunc; 
    //  this.createClientMessage = createClientMessage;
    //  this.stateRef = stateRef;
    //  this.createCustomMessage = createCustomMessage;
 
 export default ActionProvider;