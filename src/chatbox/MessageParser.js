// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      // console.log(message)
      const lowercase=message.toLowerCase();
      if (lowercase.includes("hello")){
       this.actionProvider.helloWorldHandler()//coming from the action provider 
      } 
      if(lowercase.includes("settings")){
        this.actionProvider.inAppqsHandler();
      }
    }
  }
  
  export default MessageParser;
  //  new MessageParser(actionProvider,state)   