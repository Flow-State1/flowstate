// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      // console.log(message)
      const lowercase=message.toLowerCase()
      console.log(this.state)
      if (lowercase.includes("hello")){
       this.actionProvider.helloWorldHandler()//coming from the action provider 
      } 
    }
  }
  
  export default MessageParser;
  //  new MessageParser(actionProvider,state)   